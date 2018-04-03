module SerializerHelper
  def to_object_by_id(entity_collection)
    entity_collection.inject({}) do |hash, entity|
      hash[entity.id] = entity
      hash
    end
  end
end
