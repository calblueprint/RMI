class DelegationSerializer < ActiveModel::Serializer
  attributes :id,
             :status,
             :answer_id,
             :source_id,
             :building_operator_id,
             :created_at,
             :updated_at,
             :building_operator

  def id
    object.id.to_s
  end

  def building_operator
    object.building_operator.as_json(methods: :last_sign_in_at)
  end
end
