class PortfolioSerializer < ActiveModel::Serializer
  attributes :id,
  			 		 :name,
						 :asset_manager_contacts


	def asset_manager_contacts
		contacts = []
		object.asset_managers.each do |a|
			contact = {
				firstName: a.first_name,
				lastName: a.last_name,
				email: a.email
			}
			contacts.push(contact)
		end
		contacts
  end
end
