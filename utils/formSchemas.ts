/*
    This schema reflects the structure of the 'address' table in Supabase.
    Each id in this schema corresponds to a column in the Supabase address table.
    To maintain consistency, if more columns are required in the Supabase address table, 
    they should first be added here.
*/

export const addressFormSchema = [
  {
    id: "street_address",
    label: "Street Address",
    placeholder: "House number and street name, e.g. 123 Elm St",
    value: "",
    type: "text",
    required: true,
  },
  {
    id: "address_type",
    label: "Address Type",
    placeholder: "",
    value: "",
    type: "text",
    required: true,
  },
  {
    id: "complex_or_building",
    label: "Complex / Building (Optional)",
    placeholder:
      "Complex or Building Name, unit number or floor, e.g. Maple Apt #10",
    value: "",
    type: "text",
  },
  {
    id: "suburb",
    label: "Suburb",
    value: "",
    type: "text",
    required: true,
    placeholder: "e.g. Westville",
  },
  {
    id: "city_or_town",
    label: "City / Town",
    value: "",
    type: "text",
    required: true,
    placeholder: "e.g. Springfield",
  },
  {
    id: "province",
    label: "Province",
    value: "",
    type: "select",
    required: true,
    options: [
      "Eastern Cape",
      "Free State",
      "Gauteng",
      "KwaZulu-Natal",
      "Limpopo",
      "Mpumalanga",
      "Northern Cape",
      "North West",
      "Western Cape",
    ],
    placeholder: "Select your province",
  },
  {
    id: "post_code",
    label: "Post Code",
    value: "",
    type: "text",
    required: true,
    placeholder: "e.g. 1234",
  },
];

export const personalInfoFormSchema = [
  {
    id: "first_name",
    label: "Recipient Name",
    value: "",
    type: "text",
    placeholder: "e.g. John",
    required: true,
  },
  {
    id: "last_name",
    label: "Recipient Last Name",
    value: "",
    type: "text",
    placeholder: "e.g. Doe",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    value: "",
    type: "email",
    placeholder: "you@example.com",
    required: true,
  },
  {
    id: "phone_number",
    label: "Recipient Mobile Number",
    value: "",
    type: "text",
    placeholder: "e.g. +2734567890",
    required: true,
  },
];

export const addSpacesToLabel = (label: string) => {
  // Convert underscores to spaces and then capitalize the first letter of each word for display
  return label
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
