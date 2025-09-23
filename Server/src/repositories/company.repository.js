const company = require("../models/company");

exports.createCompany = (data) => company.create(data)

exports.findAllCompanies = async (limit, page, search) => {
  const query = {};

  if (search) {
    const q = search.trim();
    const year = Number(q);

    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { industry: { $regex: q, $options: 'i' } },
      { 'address.street': { $regex: q, $options: 'i' } },
      { 'address.city': { $regex: q, $options: 'i' } },
      { 'address.state': { $regex: q, $options: 'i' } },
      { 'address.country': { $regex: q, $options: 'i' } },
    ];

    if (!isNaN(year)) {
      query.$or.push({ foundedYear: year });
    }
  }

  const total = await company.countDocuments(query);

  const companies = await company.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    total,
    page,
    limit,
    data: companies,
  };
};

exports.findByCompanyId = (id) => company.findById(id)

exports.findByName = (name) => company.findOne({ name: { $regex: name, $options: 'i' }})

exports.updateCompanyById = (id, data) => company.findByIdAndUpdate(id, data, { new: true })

exports.deleteCompanyById = (id) => company.findByIdAndDelete(id)