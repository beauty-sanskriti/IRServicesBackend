// Auth Validation — request body validators
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    errors.push('Valid email is required.');
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed.', errors });
  }
  next();
};

export const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];
  const allowedRoles = ['superadmin', 'admin', 'recruiter'];

  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
  if (!email || !email.includes('@'))   errors.push('Valid email is required.');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters.');
  if (role && !allowedRoles.includes(role)) errors.push(`Role must be one of: ${allowedRoles.join(', ')}`);

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed.', errors });
  }
  next();
};
