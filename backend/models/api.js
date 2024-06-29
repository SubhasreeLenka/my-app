router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      // Check if user exists
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  
      // Send token and user data in response
      res.json({ success: true, token, userId: user._id, name: user.name });
    } catch (error) {
      // Handle server error
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  });
  