import { useEffect, useState } from "react";

const useForm = (initial = {}, company, mode) => {
  const [data, setData] = useState(initial);

  useEffect(() => {
    if (company && mode === "edit") {
      setData({
        _id: company._id || "",
        name: company.name || "",
        industry: company.industry || "",
        address: { ...company.address },
        foundedYear: company.foundedYear || "",
        noEmployees: company.noEmployees || "",
      });
    } else if (mode === "create") {
      setData(initial);
    }
  }, [company, mode, initial])

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1]
      setData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [key]: value,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return { data, handleChange, setData };
};

export default useForm;
