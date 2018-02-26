class Api::RangeOptionsController < ApplicationController
  def create
    question = Question.new(question_params)
    if question.save
      render_json_message(:ok, message: "New Question: #{question.id} created", data: question)
    else
      render_json_message(:forbidden, errors: question.errors.full_messages)
    end
  end

  def show
    question = Question.find(params[:id])
    render json: question
  end

  def update
    dropdown_option = DropdownOption.find(params[:id])
    if dropdown_option.update(dropdown_options_params)
      render_json_message(:ok, message: "Question #{dropdown_option.id} successfully updated", data: dropdown_option)
    else
      render_json_message(:forbidden, errors: dropdown_option.errors.full_messages)
    end
  end

  def destroy
    dropdown_option = DropdownOption.find(params[:id])
    dropdown_option.destroy
    if dropdown_option.destroyed?
      render_json_message(:ok, message: "Question #{dropdown_option.id} successfully destroyed")
    else
      render_json_message(:forbidden, errors: dropdown_option.errors.full_messages)
    end
  end

  private

  def dropdown_options_params
    params.require(:question)
      .permit(
        :text,
        :question_id
      )
  end
end
