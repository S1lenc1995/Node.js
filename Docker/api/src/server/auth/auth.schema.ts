const authSchema = {
    type: "object",
    properties: {
      email: { type: "string", format: "email"},
      password: { type: "string"},
      confirmPassword: { type: "string"},
    },
    required: ["email", "password", "confirmPassword"],
    additionalProperties: false,
  };
  
  export default authSchema;
  