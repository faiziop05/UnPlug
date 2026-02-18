import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomTextInput from "../components/CustomTextInput";
import CustomSheet from "../components/CustomSheet";
import CustomAlert from "./CustomAlert";

const TASK_TYPES = ["video", "read", "practice", "audio"];

export const CreateCustomPlanSheet = ({
  visible,
  onClose,
  onCreatePlan,
  t,
}) => {
  const [newPlanTitle, setNewPlanTitle] = useState("");
  const [newPlanDesc, setNewPlanDesc] = useState("");
  const [customTasks, setCustomTasks] = useState([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskInput, setTaskInput] = useState({
    title: "",
    time: "",
    type: "read",
    link: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };
  const hideAlert = () => {
    setAlertVisible(false);
  };

  const addTask = () => {
    if (!taskInput.title)
      return showAlert("Required", "Please enter a task title.");
    const newTask = {
      id: Date.now().toString(),
      title: taskInput.title,
      completed: false,
      notes: "",
      time: taskInput.time || "15 min",
      type: taskInput.type,
      resources: taskInput.link ? { link: taskInput.link } : {},
      customResources: [],
    };
    setCustomTasks([...customTasks, newTask]);
    setTaskInput({ title: "", time: "", type: "read", link: "" });
    setIsAddingTask(false);
  };

  const removeTask = (id) => {
    setCustomTasks(customTasks.filter((t) => t.id !== id));
  };

  const handleFinalize = () => {
    if (!newPlanTitle)
      return showAlert("Required", "Please enter a plan name.");
    if (customTasks.length === 0)
      return showAlert("Empty", "Please add at least one task.");
    if (isAddingTask && !taskInput.title)
      return showAlert("Unsaved Task", "Please finish adding your task or cancel.");

    onCreatePlan({
      title: newPlanTitle,
      description: newPlanDesc,
      tasks: customTasks,
    });

    // Reset Form
    setNewPlanTitle("");
    setNewPlanDesc("");
    setCustomTasks([]);
    onClose();
  };

  return (
    <>
      <CustomSheet visible={visible} onClose={onClose} title="Design Your Plan">
        <KeyboardAvoidingView
          style={[styles.container, { backgroundColor: t.background.main }]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.label, { color: t.text.secondary }]}>
              Plan Name
            </Text>
            <CustomTextInput
              placeholder="e.g. Learn to Juggle"
              value={newPlanTitle}
              onChange={setNewPlanTitle}
            />

            <Text style={[styles.label, { color: t.text.secondary }]}>
              Description (Optional)
            </Text>
            <CustomTextInput
              placeholder="What's the goal?"
              value={newPlanDesc}
              onChange={setNewPlanDesc}
              multiline
            />

            {/* TASK BUILDER HEADER */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: t.text.primary }]}>
                Tasks ({customTasks.length})
              </Text>
              <TouchableOpacity onPress={() => setIsAddingTask(!isAddingTask)}>
                <Text style={{ color: t.brand.primary, fontWeight: "700" }}>
                  {isAddingTask ? "Cancel" : "+ Add Task"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* ADD TASK FORM */}
            {isAddingTask && (
              <View
                style={[
                  styles.addTaskForm,
                  {
                    backgroundColor: t.background.surface,
                    borderColor: t.brand.primary,
                  },
                ]}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    marginBottom: 10,
                    color: t.brand.primary,
                  }}
                >
                  New Task Details
                </Text>
                <CustomTextInput
                  placeholder="Task Title (e.g. Buy Balls)"
                  value={taskInput.title}
                  onChange={(val) => setTaskInput({ ...taskInput, title: val })}
                  style={{ width: "100%" }}

                />
                <CustomTextInput
                  placeholder="Time in minutes (e.g. 15)"
                  style={{ width: "100%" }}
                  keyboardType="numeric"
                  value={taskInput.time}
                  onChange={(val) =>
                    setTaskInput({ ...taskInput, time: val })
                  }
                />

                <View
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flex: 1, alignItems: "center", flexDirection: "row", marginBottom: 15 }}
                >
                  {TASK_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setTaskInput({ ...taskInput, type })}
                      style={[
                        styles.typePill,
                        {
                          backgroundColor:
                            taskInput.type === type
                              ? t.brand.primary
                              : t.background.surfaceHighlight,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color:
                            taskInput.type === type
                              ? "white"
                              : t.text.secondary,
                          fontSize: 12,
                          fontWeight: "600",
                          textTransform: "capitalize",
                        }}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <CustomTextInput
                  placeholder="Resource Link (Optional)"
                  value={taskInput.link}
                  onChange={(val) => setTaskInput({ ...taskInput, link: val })}
                  style={{ width: "100%" }}

                  leftIcon={
                    <Ionicons name="link" size={18} color={t.text.secondary} />
                  }
                />
                <TouchableOpacity
                  onPress={addTask}
                  style={[
                    styles.smallBtn,
                    { backgroundColor: t.brand.primary, marginTop: 15 },
                  ]}
                >
                  <Text style={{ color: "white", fontWeight: "700" }}>
                    Add Task
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* TASK LIST PREVIEW */}
            {customTasks.map((task, index) => (
              <View
                key={task.id}
                style={[
                  styles.taskPreviewItem,
                  { backgroundColor: t.background.surface },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "600", color: t.text.primary }}>
                    {index + 1}. {task.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: t.text.secondary }}>
                    {task.time} • {task.type} {task.resources.link ? "• 🔗" : ""}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeTask(task.id)}>
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={t.status.error}
                  />
                </TouchableOpacity>
              </View>
            ))}
            {customTasks.length === 0 && !isAddingTask && (
              <Text
                style={{
                  textAlign: "center",
                  color: t.text.secondary,
                  marginTop: 20,
                  fontStyle: "italic",
                }}
              >
                No tasks added yet. Tap "+ Add Task" to start building.
              </Text>
            )}
          </ScrollView>

          <View
            style={[
              styles.bottomActionContainer,
              {
                backgroundColor: t.background.surface,
                borderTopColor: t.border.subtle,
              },
            ]}
          >
            <TouchableOpacity
              onPress={handleFinalize}
              style={[
                styles.createBtnFull,
                { backgroundColor: t.brand.primary, marginTop: 0 },
              ]}
            >
              <Text style={styles.createBtnText}>Finalize & Create Plan</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </CustomSheet>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={hideAlert}
        buttons={[
          {
            text: "OK",
            onPress: hideAlert,
            style: "cancel",
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 8, marginLeft: 4 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  addTaskForm: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
  },
  typePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
    justifyContent: "center",
    height: 45,
  },
  smallBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  taskPreviewItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  bottomActionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
  },
  createBtnFull: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  createBtnText: { color: "white", fontSize: 16, fontWeight: "700" },
});
