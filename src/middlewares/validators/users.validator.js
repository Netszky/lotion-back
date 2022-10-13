const Joi = require("joi");

const userValidation = (req, res, next) => {
  const userValidationSchema = Joi.object({
    lastname: Joi.string(),
    firstname: Joi.string(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  const validation = userValidationSchema.validate(req.body);
  if (validation.error) {
    res.json({
      success: 0,
      message: validation.error.details[0].message,
    });
  } else {
    next();
  }
};
module.exports = userValidation;
