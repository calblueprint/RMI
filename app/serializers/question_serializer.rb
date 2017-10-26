# == Schema Information
#
# Table name: questions
#
#  id                 :integer          not null, primary key
#  question_type      :integer
#  building_type_id   :integer
#  parent_option_type :string
#  parent_option_id   :integer
#  category_id        :integer
#  text               :string
#  status             :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  parameter          :string           not null


class QuestionSerializer < ActiveModel::Serializer
  attributes :id,
             :question_type,
             :options,
             :building_type_id,
             :parent_option_type,
             :parent_option_id,
             :category_id,
             :text,
             :status,
             :parameter

  has_many :answers

  # The serialized object will have a single array 'options' with all associated options,
  # instead of separate attributes like dropdown_options and range_options.
  def options
    case object.question_type
    when 'dropdown'
      object.dropdown_options
    when 'range'
      object.range_options
    else
      []
    end
  end
end
