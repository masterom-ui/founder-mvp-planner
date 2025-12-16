export interface MVPBlueprint {
  meta: {
    product_title: string;
    one_line_value_proposition: string;
    target_user: string;
    core_problem: string;
    primary_outcome: string;
  };
  founder_summary: {
    tldr: string;
    why_this_works: string;
    build_in_7_days: string[];
    proof_of_value: string;
    success_look: string;
    failure_condition: string; // When to stop
  };
  mvp_overview: {
    validation_goal: string;
    success_metric: string;
    time_to_value_seconds: number;
    binary_success_criterion: string;
  };
  steps: Array<{
    step_id: number;
    start_time: string;
    end_time: string;
    step_goal: string;
    user_action: string;
    system_response: string;
    logic: string;
    copy_text: string;
    conditional_logic: string[];
    visual_elements: string[];
  }>;
  features: {
    must_have: string[];
    nice_to_have: string[];
    scope_traps: string[]; // Renamed from explicitly_excluded
  };
  user_flow_summary: {
    entry_point: string;
    key_moment_of_value: string;
    exit_or_next_action: string;
  };
  technical_suggestions: {
    frontend_tools: string[];
    backend_or_ai_logic: string[];
    no_code_or_low_code_options: string[];
  };
  build_scope_guardrails: {
    what_to_build_now: string[];
    what_to_delay: string[];
    what_not_to_build: string[];
  };
  execution_path: {
    day_1_2: { strategy: string; tasks: string[] };
    day_3_4: { strategy: string; tasks: string[] };
    day_5_7: { strategy: string; tasks: string[] };
  };
  next_steps_for_founder: {
    validation_actions: string[];
    iteration_triggers: string[];
  };
}