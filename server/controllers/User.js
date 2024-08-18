import User from "../models/User.js";
/*[
    {
        "fullName": "Rutuja More",
        "email": "rutuja.more@example.com",
        "password": "rutujaMore@123",
        "dob": "18/06/2001"
    },
    {
        "fullName": "Rutuja Wable",
        "email": "rutuja.wable@example.com",
        "password": "rutujaWable@2023",
        "dob": "22/08/2000"
    },
    {
        "fullName": "Rutuja Jadhav",
        "email": "rutuja.jadhav@example.com",
        "password": "rutujaJadhav@456",
        "dob": "14/11/1999"
    },
    {
        "fullName": "Sakshi Shewale",
        "email": "sakshi.shewale@example.com",
        "password": "sakshiShewale@789",
        "dob": "30/04/2002"
    },
    {
        "fullName": "Nikita Raut",
        "email": "nikita.raut@example.com",
        "password": "nikitaRaut@321",
        "dob": "05/03/2003"
    }
]
 */

const postSignup = async (req, res) => {
  const { fullName, email, password, dob } = req.body;

  const user = new User({
    fullName,
    email,
    password,
    dob: new Date(dob)
  });

  try {
    const savedUser = await user.save();

    res.json({
      success: true,
      message: "Signup successful",
      data: savedUser
    })
  }
  catch (e) {
    res.json({
      success: false,
      message: e.message,
      data: null
    })
  }
}

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email,
    password: password
  });

  if (user) {
    return res.json({
      success: true,
      message: "Login successful",
      data: user
    })
  }
  else {
    return res.json({
      success: false,
      message: "Invalid credentials",
      data: null
    })
  }
}

export { postSignup, postLogin }