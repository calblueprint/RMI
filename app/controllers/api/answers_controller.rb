class Api::AnswersController < ApplicationController
  load_and_authorize_resource
  def create
    answer = Answer.new(answer_params)
    if answer.save
      render_json_message(:ok, message: 'New answer created', data: answer)
    else
      render_json_message(:forbidden, data: answer, errors: answer.errors.full_messages)
    end
  end

  def update
    answer = Answer.find(params[:id])
    if answer.update(answer_params)
      render_json_message(:ok, message: 'Answer successfully updated', data: answer)
    else
      render_json_message(:forbidden, data: answer, errors: answer.errors.full_messages)
    end
  end

  private

  def answer_params
    params.require(:answer)
          .permit(
            :text,
            :building_id,
            :question_id,
            :user_id,
            :user_type
          )
  end
end
