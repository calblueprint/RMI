declare module "rmi" {
  declare export class Building {
    id: number,
    name: string,
    portfolio_id: number,
    building_type_id: number,
    address: string,
    city: string,
    state: string,
    zip: number,
    answers: [Answer]
  }

  declare export class Answer {
    id: number,
    text?: string,
    building_id: number,
    question_id: number,
    created_at: string,
    updated_at: string,
    selected_option_id?: number,
    attachment_file_name?: string,
    attachment_content_type?: string,
    attachment_file_size?: number,
    attachment_updated_at?: string,
    delegation_email?: string,
    delegation_first_name?: string,
    delegation_last_name?: string
  }

  declare type OptionType = "DropdownOption" | "RangeOption" | "FileOption" | "free";

  declare export class Question {
    id: number,
    question_type: OptionType,
    building_type_id: number,
    parent_option_type?: OptionType,
    parent_option_id?: number,
    category_id: number,
    text: string,
    status: "draft" | "published",
    parameter: string,
    options: Array<number>,
    helper_text?: string,
    unit?: string
  }
}