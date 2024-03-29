import { useState } from "react";
import { Form } from "react-bootstrap";
import { Priorities } from "../models/TodoPriorityEnum";
import { TodoTask } from "../models/TodoTaskModel";
import API_BASE_URL from "../config";
import { ToastContainer, toast } from "react-toastify";

type checkBoxProps = {
  todo: TodoTask;
};

const CheckBox = ({ todo }: checkBoxProps) => {
  // Mark as completed /not completed
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //Call update API
    try {
      const response = await fetch(`${API_BASE_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          isCompleted: e.target.checked,
        }),
      });

      if (!response.ok) {
        throw new Error("Update API failed");
      }
      console.log("Todo mark as completed");
      toast.success("Todo mark as completed.", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      });
    } catch (error) {
      console.error("Error updating checkbox:", error);
      toast.error("Todo mark as complete got failed", {
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      });
    }
  };

  return (
    <Form>
      <ToastContainer />
      <div key="reverse-checkbox" className="mb-3">
        <Form.Check
          reverse
          name="complete-checkbox"
          type="checkbox"
          id="complete-checkbox"
          checked={todo.isCompleted}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </Form>
  );
};

export default CheckBox;
