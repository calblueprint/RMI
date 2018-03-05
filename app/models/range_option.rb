# == Schema Information
#
# Table name: range_options
#
#  id          :integer          not null, primary key
#  min         :integer
#  max         :integer
#  question_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class RangeOption < ApplicationRecord
  has_many :child_questions, as: :parent_option, :dependent => :destroy
  belongs_to :question

  validates :min, :max, presence: true
  validate :is_valid_min_max

  def type
    'range'
  end

  private

  def is_valid_min_max
    return if min.nil? or max.nil?

    if min > max
      errors.add(:range_options, 'cannot have min values greater than their max values')
    end

    # Range options for the same question cannot have any overlaps; otherwise it's unclear which child question
    # should be triggered
    self.question.range_options.each do |range_option|
      if range_option.id != self.id && ranges_overlap(range_option, self)
        errors.add(:range_options, 'cannot have overlapping ranges')
        return
      end
    end
  end

  def ranges_overlap(range1, range2)
    # Even if min > max, we can still check for overlap assuming the user intended to swap the min and max values
    min1, max1 = [range1.min, range1.max].minmax
    min2, max2 = [range2.min, range2.max].minmax
    return [min1, min2].max <= [max1, max2].min
  end
end
