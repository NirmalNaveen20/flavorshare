import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import logo from "../../Images/flavor.png"
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../Redux/Auth/Action";
import { useEffect } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is Required"),
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is Required"),
});

const Signup = () => {
  const initialValues = { email: "", username: "", password: "", name: "" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { auth } = useSelector((store) => store);

  const handleNavigate = () =>navigate("/login")
  const handleSubmit = (values, actions) => {
    console.log("values: ", values);
    dispatch(signupAction(values));
    actions.setSubmitting(false);
  };

  useEffect(()=>{
    if(auth.signup?.username){
      navigate("/login")
      toast({
        title: `Account created ${auth.signup?.username}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
},[auth.signup])

  return (
    <div>
      <div className="border border-slate-300 ">
        <Box p={8} display="flex" flexDirection="column" alignItems="center">
          <img
            className="border border-red-800"
            src={logo}
            alt=""
          />
          <p className="font-bold opacity-50 text-lg mb-10 text-center">
            Sign up to see photos and videos from your friends.
          </p>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <Form className="w-full">
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                      mb={4}
                    >
                      <Input
                        className="w-full"
                        {...field}
                        id="email"
                        placeholder="Mobile Number Or Email"
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                      mb={4}
                    >
                      <Input {...field} id="username" placeholder="username" />
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      mb={4}
                    >
                      <Input {...field} id="name" placeholder="Full Name" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      mb={4}
                    >
                      <Input
                        {...field}
                        type="password"
                        id="password"
                        placeholder="Password"
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <p className="text-center text-sm">
                  People who use our service may have uploaded your contact
                  information to Instagram. Learn More
                </p>
                <p className="mt-5 text-center text-sm">
                  By signing up, you agree to our Terms , Privacy Policy and
                  Cookies Policy .
                </p>
                <Button
                  className="w-full"
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                  isLoading={formikProps.isSubmitting}
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
      <div className="w-full border border-slate-300 mt-5">
        <p className="text-center py-2 text-sm">
          If You Have Already Account{" "}
          <span onClick={handleNavigate} className="ml-2 text-blue-700 cursor-pointer" >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
