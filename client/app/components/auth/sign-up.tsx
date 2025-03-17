import { Form, redirect } from "react-router";
import { Box, TextField, Button, Typography } from "@mui/material";
import type { Route } from "./+types/sign-up";
import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { type SignupSchemaType, SignupSchema } from "shared";
import { zodResolver } from "@hookform/resolvers/zod";

const resolver = zodResolver(SignupSchema);

export async function action({ request }: Route.ActionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<SignupSchemaType>(request, resolver);
  console.log('errors ---', errors)
  console.log('data ---', data)
  console.log('defaultValues ---', errors)
  if (errors) {
    return { errors, defaultValues };
  }

  // Do something with the data
  return data;
}

export default ({ actionData }: Route.ComponentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRemixForm<SignupSchemaType>({
    resolver,
  });

  console.log("error ---", errors);
  console.log("actionData ---", actionData);
  return (
    <Box
      component="section"
      sx={{
        padding: 2,
        border: "1px dashed grey",
        width: "50%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {actionData ? <p>{JSON.stringify(actionData)} updated</p> : null}
      <Form
        onSubmit={handleSubmit}
        method="post"
        style={{ width: "100%" }}
        noValidate
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          error={errors.username ? true : false}
          {...register("username", { required: true })}
        />
        {errors.username && <p>Username is required</p>}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          type="email"
          margin="normal"
          error={errors.email ? true : false}
          {...register("email", { required: true })}
        />
        {errors.email && <p>email is required</p>}

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          error={errors.password ? true : false}
          {...register("password", { required: true })}
        />
        {errors.password && <p>password is required</p>}

        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </Form>
    </Box>
  );
};
