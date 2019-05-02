# == Schema Information
#
# Table name: categories
#
#  id               :integer          not null, primary key
#  name             :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  building_type_id :integer
#

class CategorySerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :building_type_id,
             :questions

  def id
    object.id.to_s
  end

  def questions
    object.questions.map { |q| q.id }
  end
end
