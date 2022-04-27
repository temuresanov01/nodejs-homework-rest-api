const { Contact } = require('../models/contacts')

// const listContacts = async ({ limit, skip, sortCriteria, select }, user) => {
//   const total = await Contact.countDocuments({owner: user.id})
//   const results = await Contact.find({owner: user.id}).select(select).skip(skip).limit(limit).sort(sortCriteria)
//   return { total, results }
// }

const listContacts = async ({ limit, skip, sortCriteria, select }, user) => {
  const {docs: contacts, ...rest} = await Contact.paginate(
    { owner: user.id },
    { limit, offset: skip, sort: sortCriteria, select },
  )
      return  {contacts, ...rest}
}

const getContactById = async (contactId, user) => {
  const result = await Contact.findOne({ _id: contactId, owner: user.id }).populate({
    path: 'owner',
    select: 'email _id',
      }) // Contact.findById({_id: objId})
  return result
}

const removeContact = async (contactId, user) => {
  const result = await Contact.findOneAndRemove({_id: contactId, owner: user.id})
  return result
}

const addContact = async (body, user) => {
  const result = await Contact.create({...body, owner: user.id}) 
  return result
}

const updateContact = async (contactId, body, user) => {
  const result = await Contact.findOneAndUpdate(
      {_id: contactId, owner: user.id}, {...body}, {new: true},
    )
    return result
} 

const updateStatusContact = async (contactId, body, user) => {
  const result = await Contact.findOneAndUpdate(
      {_id: contactId, owner: user.id}, {...body}, {new: true},
    )
    return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}