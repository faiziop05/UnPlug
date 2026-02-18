import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TaskResourceList } from "./TaskResourceList";

// Helper for icons
const getTypeIcon = (type) => {
  switch (type) {
    case "video": return "play-circle-outline";
    case "read": return "book-outline";
    case "practice": return "code-slash-outline";
    case "audio": return "headset-outline";
    default: return "time-outline";
  }
};

export const TaskItem = ({
  task,
  planId,
  t,
  onToggleCompletion,
  onEditNote,
  onAddResource,
  onDeleteCustomResource,
  isLast,
}) => {
  return (
    <View style={styles.taskContainer}>
      {/* Timeline Connector Line (Visual only) */}
      {!isLast && (
        <View style={[styles.connectorLine, { backgroundColor: t.border.subtle }]} />
      )}

      <View style={styles.taskRow}>
        {/* Checkbox */}
        <TouchableOpacity
          onPress={() => onToggleCompletion(planId, task.id)}
          style={[
            styles.checkbox,
            {
              backgroundColor: task.completed ? t.brand.primary : t.background.surface,
              borderColor: task.completed ? t.brand.primary : t.border.subtle,
              // Subtle shadow for better visual prominence
              shadowColor: task.completed ? t.brand.primary : "transparent",
              shadowOpacity: task.completed ? 0.3 : 0,
              elevation: task.completed ? 4 : 0,
            },
          ]}
        >
          {task.completed && (
            <Ionicons name="checkmark" size={14} color={t.text.inverted} />
          )}
        </TouchableOpacity>

        {/* Title & Metadata */}
        <View style={styles.contentContainer}>
          <TouchableOpacity
            onPress={() => onToggleCompletion(planId, task.id)}
            style={{ flex: 1 }}
          >
            <Text
              style={[
                styles.taskText,
                {
                  color: task.completed ? t.text.muted : t.text.primary,
                  textDecorationLine: task.completed ? "line-through" : "none",
                },
              ]}
            >
              {task.title}
            </Text>

            <View style={styles.tagRow}>
              {task.time && (
                <View style={[styles.tag, { backgroundColor: t.background.surfaceHighlight }]}>
                  <Ionicons name="time-outline" size={10} color={t.text.secondary} style={{ marginRight: 3 }} />
                  <Text style={[styles.tagText, { color: t.text.secondary }]}>{task.time}</Text>
                </View>
              )}
              {task.type && (
                <View style={[styles.tag, { backgroundColor: t.background.surfaceHighlight, marginLeft: 6 }]}>
                  <Ionicons name={getTypeIcon(task.type)} size={10} color={t.text.secondary} style={{ marginRight: 3 }} />
                  <Text style={[styles.tagText, { color: t.text.secondary }]}>{task.type}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Edit Note Button */}
          <TouchableOpacity onPress={() => onEditNote(planId, task)} style={{ padding: 6 }}>
            <Ionicons
              name={task.notes ? "document-text" : "create-outline"}
              size={18}
              color={task.notes ? t.brand.primary : t.text.muted}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Expanded Content (Notes & Resources) - Indented */}
      <View style={styles.indentedContent}>
        {task.notes && (
          <View style={[styles.noteDisplay, { backgroundColor: t.background.surfaceHighlight, borderLeftColor: t.brand.primary }]}>
            <Ionicons name="document-text-outline" size={14} color={t.text.secondary} style={{ marginRight: 6, marginTop: 2 }} />
            <Text style={[styles.noteText, { color: t.text.secondary }]}>
              {task.notes}
            </Text>
          </View>
        )}

        <View style={{ marginTop: 4 }}>
          <TaskResourceList
            task={task}
            planId={planId}
            t={t}
            onDeleteCustomResource={onDeleteCustomResource}
            onAddResource={onAddResource}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    paddingBottom: 24, // Space for the line to flow
    position: 'relative',
  },
  connectorLine: {
    position: 'absolute',
    left: 12, // Center of checkbox (24px width / 2)
    top: 30, // Start below checkbox
    bottom: 0,
    width: 2,
    zIndex: -1,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "flex-start", // Align top for multi-line titles
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2, // Align with text
    zIndex: 1, // Above connector line
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    lineHeight: 22,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  indentedContent: {
    marginLeft: 40, // Checkbox width + margin
    marginTop: 8,
  },
  noteDisplay: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 13,
    fontStyle: "italic",
    flex: 1,
    lineHeight: 18,
  },
});
