class Api::AnswersController < ApplicationController
  load_and_authorize_resource

  def create
    answer = Answer.new(answer_params)
    if answer.save
      render_json_message(:ok, data: answer, message: 'New answer created')
    else
      render_json_message(:forbidden, data: answer, errors: answer.errors.full_messages)
    end
  end

  def create_multiple
    answers = {}
    answers_params.each do |a|
      answer = Answer.create(a)
      answers[a[:question_id]] = answer
    end
    # rescue => e
    #   render_json_message(:forbidden, errors: e.message)
    render_json_message(:ok, data: answers, message: 'New answers created')
  end

  def update
    answer = Answer.find(params[:id])
    if answer.update(answer_params)
      render_json_message(:ok, data: answer, message: 'Answer successfully updated')
    else
      render_json_message(:forbidden, data: answer, errors: answer.errors.full_messages)
    end
  end

  def update_multiple
    answers = {}
    answers_params.each do |a|
      answer = Answer.find(a[:id])
      answer.update(a)
      answers[a[:question_id]] = answer
    end
    render_json_message(:ok, data: answers, message: 'Answers batch updated')
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

  ##
  # Deletes the attachment associated with this answer, if it exists.
  # (For file option questions)
  #
  def delete_file
    answer = Answer.find(params[:id])
    if answer.attachment.destroy
      answer.save
      render_json_message(:ok, data: answer, message: 'Attachment deleted')
    else
      render_json_message(:forbidden, data: answer, errors: answer.errors.full_messages)
    end
  end

  private

  def answer_params
    params.require(:answer)
          .permit(
            :text,
            :attachment,
            :selected_option_id,
            :building_id,
            :question_id,
            :delegation_first_name,
            :delegation_last_name,
            :delegation_email,
            :attachment_file_name,
            :attachment_content_type,
            :attachment_file_size,
            :attachment_updated_at
          )
  end

  # answers batch creation
  def answers_params
    params.require(:answers).map! do |answer|
      # batch creation needs "partial answers" and will not contain delegation information until delegated
      answer.permit(
            :text,
            :attachment,
            :selected_option_id,
            :building_id,
            :question_id,
            :delegation_first_name,
            :delegation_last_name,
            :delegation_email,
            :attachment_file_name,
            :attachment_content_type,
            :attachment_file_size,
            :attachment_updated_at,
            :id,
            :created_at,
            :updated_at
          )
    end
  end
end
