import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import logo from "../../Images/flavor.png"
import { useDispatch, useSelector } from "react-redux";
import { signinAction } from "../../Redux/Auth/Action";
import { useEffect } from "react";
import { getUserProfileAction } from "../../Redux/User/Action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required"),
});

const Signin = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, signin } = useSelector((store) => store);
  const toast = useToast();
  const jwt = localStorage.getItem("token");

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(signinAction(values));
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (jwt) dispatch(getUserProfileAction(jwt));
  }, [jwt]);

  useEffect(() => {
    if (user?.reqUser?.username) {
      navigate(`/${user.reqUser?.username}`);
      toast({
        title: "signin successfull",
        status: "success",
        duration: 8000,
        isClosable: true,
      });
    }
  }, [jwt, user.reqUser]);

  const handleNavigate = () =>navigate("/signup")

  return (
    <div className=" ">
      <div className="border border-slate-300">
        <Box p={8} display="flex" flexDirection="column" alignItems="center">
          <img
            className="border border-red-800 mb-5"
            src={logo}
            alt=""
          />

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
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>

      <div className="w-full border border-slate-300 mt-5">
        <p className="text-center py-2 text-sm">
          If You Don't Have Already Account{" "}
          <span
            onClick={handleNavigate}
            className="ml-2 text-blue-700 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
