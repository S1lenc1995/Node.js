const postsSchema = {
    type: "object",
    properties: {
      author: { type: "string", maxLength: 25},
      content: { type: "string", maxLength: 256},
      title: { type: "string", maxLength: 50},
      genre: {
        type: "string",
        enum: ["Politic", "Business", "Sport", "Other"],
      },
      isPrivate: { type: "boolean" },
    },
    required: ["author", "content", "title", "genre", "isPrivate"],
    additionalProperties: false,
  };
  
  export default postsSchema;
  