import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import * as yup from "yup";
import { MeetupItemWithoutIdAndFav } from "./AllMeetups";

const locationSchema = yup.object({
  title: yup.string().required().min(4),
  address: yup.string().required().min(4),
  description: yup.string().required().min(8),
});

// `MeetupForm` expects a single prop `addLocation` which is a function which takes a `MeetupItemWithoutIdAndFav` object as parameter and has a void return type
const MeetupForm = ({
  addLocation,
}: {
  addLocation: (location: MeetupItemWithoutIdAndFav) => void;
}) => {
  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: "", address: "", description: "" }}
        validationSchema={locationSchema}
        onSubmit={(values) => addLocation(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            {Object.keys(values).map((value, i) => {
              return (
                <View style={styles.inputContainer} key={i}>
                  <Text style={styles.error}>
                    {touched[value as keyof typeof touched] &&
                      errors[value as keyof typeof errors]}
                  </Text>
                  <TextInput
                    placeholder={capitalizeFirstLetter(value)}
                    onChangeText={handleChange(value)}
                    value={values[value as keyof typeof values]}
                    onBlur={handleBlur(value)}
                    style={[
                      styles.input,
                      { minHeight: value === "description" ? 80 : undefined },
                    ]}
                    multiline={value === "description" ? true : false}
                  />
                </View>
              );
            })}
            <Button title="Add new meetup" onPress={() => handleSubmit()} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default MeetupForm;

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 15,
  },
  inputContainer: {
    marginVertical: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  error: {
    color: "red",
  },
});
