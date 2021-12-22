/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, selectTaskStatus } from "../redux/slices/tasksSlice";
import { NewTaskSchema } from "../utils/formValidation";
import Spinner from "./Spinner";

const TaskAdd = () => {
  const taskStatus = useSelector(selectTaskStatus);
  const dispatch = useDispatch();

  const initialValues = { summary: "" };

  const handleSubmit = (values, { resetForm }) => {
    const payload = { summary: values.summary };
    dispatch(addTask(payload));
    resetForm(initialValues);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NewTaskSchema}
    >
      <Form className="add-task">
        <div className="input-box">
          <Field
            type="text"
            className="input"
            name="summary"
            id="summary"
            placeholder="Tarea nueva..."
            required
          />
          <button type="submit" className="btn-add">
            {taskStatus === "loading" ? (
              <Spinner size="small" />
            ) : (
              <>
                <i className="bi bi-calendar-plus" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
        <ErrorMessage name="summary">
          {(error) => <div className="alert">{error}</div>}
        </ErrorMessage>
      </Form>
    </Formik>
  );
};

export default TaskAdd;
