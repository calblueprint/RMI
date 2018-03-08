class Api::AnswersController < ApplicationController
  # load_and_authorize_resource << WHY???????

  def create
    answer = Answer.new(answer_params)
    if answer.save
      render_json_message(:ok, data: answer, message: 'New answer created')
    else
      render_json_message(:forbidden, data: answer, errors: answer.errors.full_messages)
    end
  end

  def update
    answer = Answer.find(params[:id])
    if answer.update(answer_params)
      render_json_message(:ok, data: answer, message: 'Answer successfully updated')
    else
      render_json_message(:forbidden, data: answer, errors: answer.errors.full_messages)
    end
  end

  # Redirect user to download attachment
  # Not actually showing Answer because it should be accessed with buildings
  def show
    redirect_to download_file
  end

  ##
  # Validates that the email is valid address, then sets the status of the
  # answer to be predelegated
  #
  def predelegate_answer(email)
    answer = Answer.find(params[:id])
    answer.set_status_predelegated(email)
  end

  ##
  # Returns a temporary url to the file option associated with this answer
  #
  def download_file
    answer = Answer.find(params[:id])
    answer.attachment.expiring_url(60)
  end

  private

  def answer_params
    params.require(:answer)
          .permit(
            :text,
            :attachment,
            :selected_option_id,
            :building_id,
            :question_id
          )
  end
end
