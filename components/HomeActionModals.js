import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import CustomModal from "../components/CustomModal";
import CustomAlert from "../components/CustomAlert";
import CustomTextInput from "../components/CustomTextInput";

export const HomeActionModals = ({
  modalType,
  closeModal,
  handleDeletePlan,
  saveNote,
  saveResource,
  tempInput,
  setTempInput,
  t,
}) => {
  return (
    <>
      <CustomAlert
        visible={modalType === "CONFIRM_DELETE"}
        title="Delete Plan?"
        message="Are you sure you want to delete this plan? This action cannot be undone."
        onClose={closeModal}
        buttons={[
          { text: "Cancel", style: "cancel", onPress: closeModal },
          { text: "Delete", onPress: handleDeletePlan },
        ]}
      />

      <CustomModal
        visible={modalType === "EDIT_NOTE"}
        title="Edit Note"
        onClose={closeModal}
      >
        <CustomTextInput

          placeholder="Add a note..."
          value={tempInput.title}
          onChange={(val) => setTempInput({ ...tempInput, title: val })}
          multiline
          style={{ height: 100, textAlignVertical: "top", width: '100%' }}
        />
        <TouchableOpacity
          onPress={saveNote}
          style={[styles.modalBtn, { backgroundColor: t.brand.primary }]}
        >
          <Text style={styles.btnText}>Save Note</Text>
        </TouchableOpacity>
      </CustomModal>

      <CustomModal
        visible={modalType === "ADD_RESOURCE"}
        title="Add Resource"
        onClose={closeModal}
      >
        <CustomTextInput
          placeholder="Title (e.g. Article)"
          value={tempInput.title}
          onChange={(val) => setTempInput({ ...tempInput, title: val })}
          style={{ width: '100%' }}
        />
        <CustomTextInput
          placeholder="URL (https://...)"
          value={tempInput.link}
          onChange={(val) => setTempInput({ ...tempInput, link: val })}
          autoCapitalize="none"
          style={{ width: '100%' }}
        />
        <TouchableOpacity
          onPress={saveResource}
          style={[styles.modalBtn, { backgroundColor: t.brand.primary }]}
        >
          <Text style={styles.btnText}>Add Resource</Text>
        </TouchableOpacity>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBtn: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "bold" },
});
