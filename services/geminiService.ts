import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MVPBlueprint } from "../types";

const SYSTEM_INSTRUCTION = `
ROLE: Senior AI Product Strategist & Execution Advisor.
GOAL: Transform raw ideas into binary "Build or Kill" MVP blueprints.
TONE: Authoritative, brutal, precise. No fluff. No generic advice.

CORE RULES:
1. FOUNDER-FIRST: Optimize for speed/decision. Assume founder is solo & time-poor.
2. OPINIONATED: Explicitly cut scope. Force specificity. If idea is generic, niche it down hard.
3. BINARY OUTCOMES: End with clear "Proceed if X, else Kill" criteria.
4. SCOPE DISCIPLINE: Max 3 build items. Everything else is distraction.

INSTRUCTIONS FOR JSON FIELDS:

1. founder_summary:
   - tldr: 3-4 sentences. Executive summary. What it is, who for, what decision in 7 days.
   - why_this_works: 1 sentence logic anchor.
   - failure_condition: Explicit condition to STOP.
   - build_in_7_days: 3 bullets on exactly what to ship.
   - proof_of_value: What proves it works.
   - success_look: Success metric.

2. execution_path (7-Day Plan):
   - Group into Day 1-2, 3-4, 5-7.
   - Focus on FOUNDER ACTIONS (validate, sell, recruit) first, then technical tasks.
   - strategy: The strategic goal for this block.
   - tasks: Concrete steps (e.g., "Day 1: Interview 5 users").

3. features (Scope Lock):
   - must_have (Build Now): Max 3 items. Validation only.
   - nice_to_have (Delay): Limit 2.
   - scope_traps (Do Not Build): Explicitly forbid overengineering (auth, scaling, dashboards).

4. steps (User Journey):
   - 3-5 steps.
   - conditional_logic: "IF X fails, THEN Y". Include failure/quality gates.

5. mvp_overview (Validation):
   - binary_success_criterion: "Proceed ONLY if [metric] in 7 days. Else kill."
   - validation_goal, success_metric, time_to_value_seconds.

INTERNAL QUALITY CHECK (Self-Correction):
- Is this actionable tomorrow?
- Is scope tight enough for 7 days?
- Does it force a decision?
If NO, rewrite to be tougher before outputting.
`;

const blueprintSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    meta: {
      type: Type.OBJECT,
      properties: {
        product_title: { type: Type.STRING },
        one_line_value_proposition: { type: Type.STRING },
        target_user: { type: Type.STRING },
        core_problem: { type: Type.STRING },
        primary_outcome: { type: Type.STRING },
      },
      required: ['product_title', 'one_line_value_proposition', 'target_user', 'core_problem', 'primary_outcome'],
    },
    founder_summary: {
      type: Type.OBJECT,
      properties: {
        tldr: { type: Type.STRING, description: "Command-based summary. Problem -> Action -> Outcome." },
        why_this_works: { type: Type.STRING, description: "1-sentence logic anchor. e.g. 'This works because it removes ambiguity before code.'" },
        build_in_7_days: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 bullet points on exactly what to ship." },
        proof_of_value: { type: Type.STRING },
        success_look: { type: Type.STRING },
        failure_condition: { type: Type.STRING, description: "If clarity does not improve or users don't care, stop here." },
      },
      required: ['tldr', 'why_this_works', 'build_in_7_days', 'proof_of_value', 'success_look', 'failure_condition'],
    },
    mvp_overview: {
      type: Type.OBJECT,
      properties: {
        validation_goal: { type: Type.STRING },
        success_metric: { type: Type.STRING },
        time_to_value_seconds: { type: Type.NUMBER },
        binary_success_criterion: { type: Type.STRING, description: "Specific condition to proceed. e.g. '5 of 10 users say yes'." },
      },
      required: ['validation_goal', 'success_metric', 'time_to_value_seconds', 'binary_success_criterion'],
    },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          step_id: { type: Type.NUMBER },
          start_time: { type: Type.STRING },
          end_time: { type: Type.STRING },
          step_goal: { type: Type.STRING },
          user_action: { type: Type.STRING },
          system_response: { type: Type.STRING },
          logic: { type: Type.STRING },
          copy_text: { type: Type.STRING },
          conditional_logic: { type: Type.ARRAY, items: { type: Type.STRING }, description: "If/Then logic." },
          visual_elements: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['step_id', 'start_time', 'end_time', 'step_goal', 'user_action', 'system_response', 'logic', 'copy_text', 'conditional_logic', 'visual_elements'],
      },
    },
    features: {
      type: Type.OBJECT,
      properties: {
        must_have: { type: Type.ARRAY, items: { type: Type.STRING } },
        nice_to_have: { type: Type.ARRAY, items: { type: Type.STRING } },
        scope_traps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Explicitly forbidden features." },
      },
      required: ['must_have', 'nice_to_have', 'scope_traps'],
    },
    user_flow_summary: {
      type: Type.OBJECT,
      properties: {
        entry_point: { type: Type.STRING },
        key_moment_of_value: { type: Type.STRING },
        exit_or_next_action: { type: Type.STRING },
      },
      required: ['entry_point', 'key_moment_of_value', 'exit_or_next_action'],
    },
    technical_suggestions: {
      type: Type.OBJECT,
      properties: {
        frontend_tools: { type: Type.ARRAY, items: { type: Type.STRING } },
        backend_or_ai_logic: { type: Type.ARRAY, items: { type: Type.STRING } },
        no_code_or_low_code_options: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['frontend_tools', 'backend_or_ai_logic', 'no_code_or_low_code_options'],
    },
    build_scope_guardrails: {
      type: Type.OBJECT,
      properties: {
        what_to_build_now: { type: Type.ARRAY, items: { type: Type.STRING } },
        what_to_delay: { type: Type.ARRAY, items: { type: Type.STRING } },
        what_not_to_build: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['what_to_build_now', 'what_to_delay', 'what_not_to_build'],
    },
    execution_path: {
      type: Type.OBJECT,
      properties: {
        day_1_2: { 
            type: Type.OBJECT, 
            properties: { strategy: {type: Type.STRING}, tasks: {type: Type.ARRAY, items: {type: Type.STRING}} },
            required: ['strategy', 'tasks']
        },
        day_3_4: { 
            type: Type.OBJECT, 
            properties: { strategy: {type: Type.STRING}, tasks: {type: Type.ARRAY, items: {type: Type.STRING}} },
            required: ['strategy', 'tasks']
        },
        day_5_7: { 
            type: Type.OBJECT, 
            properties: { strategy: {type: Type.STRING}, tasks: {type: Type.ARRAY, items: {type: Type.STRING}} },
            required: ['strategy', 'tasks']
        },
      },
      required: ['day_1_2', 'day_3_4', 'day_5_7'],
    },
    next_steps_for_founder: {
      type: Type.OBJECT,
      properties: {
        validation_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
        iteration_triggers: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['validation_actions', 'iteration_triggers'],
    },
  },
  required: ['meta', 'founder_summary', 'mvp_overview', 'steps', 'features', 'user_flow_summary', 'technical_suggestions', 'build_scope_guardrails', 'execution_path', 'next_steps_for_founder'],
};

export const generateBlueprint = async (title: string, description: string): Promise<MVPBlueprint> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
  Idea Title: ${title}
  Idea Description: ${description}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: blueprintSchema,
        thinkingConfig: { thinkingBudget: 0 } // Disable thinking for speed
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response text generated");
    
    return JSON.parse(text) as MVPBlueprint;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};