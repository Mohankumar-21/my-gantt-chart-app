import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

import { IoMdArrowDropup } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPlusSquare,
  faPlus,
  faFolder,
  faFolderOpen,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { throttle } from "lodash";

import {
  Box,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { db } from "./firebase/firebaseconfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "@firebase/firestore";
import { useToast } from "@chakra-ui/react";

interface Task {
  id: string;
  name: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart: string;
  actualEnd: string;
  duration: number;
  actualDuration?: number;
  dependency: string;
  risk: string;
  inlineProgress?: number;
  progress: number;
  role?: string;
  status: string;
  type: string;
  stage?: string;
  subtasks?: Task[];
  dependencies?: { taskId: string; type: "FS" | "SS" | "FF" | "SF" }[];
}

interface Connection {
  id: string;
  sourceTaskId: string;
  targetTaskId: string;
  connectionType: "FS" | "SS" | "FF" | "SF"; // Connection type
}

const TaskContext = createContext<{
  expandedTaskIds: Set<string>;
  toggleExpandedTask: (taskId: string) => void;
} | null>(null);

const TaskListPanel: React.FC<{
  tasks: Task[];
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  width: string;
  selectedTaskId: string;
  onSelectTask: (id: string) => void;
  zoomLevel: string;
  expandedTaskId: string | null;
  setExpandedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({
  selectedTaskId,
  onSelectTask,
  width,
  zoomLevel,
  expandedTaskId,
  setExpandedTaskId,
  tasks,
  setTask,
}) => {
  const toast = useToast();
  const [isFocused, setIsFocused] = useState(false);
  const { expandedTaskIds, toggleExpandedTask } = useTaskContext();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    id: "",
    name: "",
    plannedStart: "",
    plannedEnd: "",
    actualStart: "",
    actualEnd: "",
    duration: 0,
    dependency: "",
    risk: "Medium",
    progress: 0,
    type: "project",
    role: "Coordinator",
    stage: "DR-1",
    status: "Not-started",
    actualDuration: 0,
    subtasks: [],
  });

  const handleRowDoubleClick = (task: Task, parentTaskId?: string) => {
    if (parentTaskId) {
      const parentTask = tasks.find((t) => t.id === parentTaskId);
      const subtaskToEdit = parentTask?.subtasks?.find(
        (sub) => sub.id === task.id
      );
      if (subtaskToEdit) {
        setNewTask({ ...subtaskToEdit });
        setEditingTaskId(task.id);
      }
    } else {
      // Editing a parent task
      setNewTask({ ...task });
      setEditingTaskId(task.id);
    }
    setIsModalOpen(true); // Open modal
  };

  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (newTask.plannedStart && newTask.duration) {
      const startDate = new Date(newTask.plannedStart);
      startDate.setDate(startDate.getDate() + newTask.duration);
      const plannedEndDate = startDate.toISOString().split("T")[0];
      setNewTask((prev) => ({
        ...prev,
        plannedEnd: plannedEndDate,
      }));
    }else if (newTask.duration === 0 || newTask.duration === null) {
      setNewTask((prev) => ({
        ...prev,
        plannedEnd: "", // Reset plannedEnd to default state
      }));
    }
  }, [newTask.plannedStart, newTask.duration]);

  useEffect(() => {
    if (newTask.actualStart && newTask.actualDuration) {
      const startDate = new Date(newTask.actualStart);
      startDate.setDate(startDate.getDate() + newTask.actualDuration);
      const actualEndDate = startDate.toISOString().split("T")[0];

      setNewTask((prev) => ({
        ...prev,
        actualEnd: actualEndDate,
      }));
    }
    else if (newTask.actualDuration === 0 || newTask.actualDuration === null) {
      setNewTask((prev) => ({
        ...prev,
        actualEnd: "", // Reset plannedEnd to default state
      }));
    }
  }, [newTask.actualStart, newTask.actualDuration]);
  const handleAddTaskClick = (parentId?: string) => {
    if (parentId) {
      const parentTask = tasks.find((task) => task.id === parentId);
      setNewTask({
        id: `${parentId}.${(parentTask?.subtasks?.length || 0) + 1}`,
        name: "",
        plannedStart: "",
        plannedEnd: "",
        actualStart: "",
        actualEnd: "",
        duration: 0,
        dependency: "",
        risk: "Medium",
        progress: 0,
        type: "task",
        role: "Coordinator",
        stage: "DR-1",
        status: "Not-started",
        actualDuration: 0,
        subtasks: [],
      });
    } else {
      // Creating a parent task
      setNewTask({
        id: `${tasks.length + 1}`,
        name: "",
        plannedStart: "",
        plannedEnd: "",
        actualStart: "",
        actualEnd: "",
        duration: 0,
        dependency: "",
        risk: "Medium",
        progress: 0,
        type: "project",
        role: "Coordinator",
        stage: "DR-1",
        status: "Not-started",
        actualDuration: 0,
        subtasks: [],
      });
    }
    setEditingTaskId(null); // Reset editing task ID for new tasks
    setIsModalOpen(true); // Open modal
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTaskId(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDurationChange = (change: number) => {

    if (!newTask.plannedStart) {
      toast({
        title: "Validation Error",
        description: "Planned Start Date must be selected first.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setNewTask((prev) => {
      const newDuration = prev.duration + change;
      return {
        ...prev,
        duration: Math.max(newDuration, 0),
      };
    });
  };

  const handleDurationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!newTask.plannedStart) {
      toast({
        title: "Validation Error",
        description: "Planned Start Date must be selected first.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    const value = e.target.value.slice(0, 6);
    const parsedValue = value.trim() === "" ? null : parseInt(value, 10);
  
    setNewTask((prev) => ({
      ...prev,
      duration: parsedValue === null || isNaN(parsedValue) ? 0 : Math.max(parsedValue, 0),
    }));
  };
  
  

  const handleActualDurationChange = (change: number) => {

    if (!newTask.actualStart) {
      toast({
        title: "Validation Error",
        description: "Actual Start Date must be selected first.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setNewTask((prev) => {
      const newDuration = (prev.actualDuration || 0) + change;
      return {
        ...prev,
        actualDuration: Math.max(newDuration, 0),
      };
    });
  };


  const handleActualDurationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!newTask.actualStart) {
      toast({
        title: "Validation Error",
        description: "Actual Start Date must be selected first.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  
    const value = e.target.value.slice(0, 6);
    const parsedValue = value.trim() === "" ? null : parseInt(value, 10);
  
    setNewTask((prev) => ({
      ...prev,
      actualDuration: parsedValue === null || isNaN(parsedValue) ? 0 : Math.max(parsedValue, 0),
    }));
  };

  const handleRiskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTask((prev) => ({
      ...prev,
      risk: e.target.value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTask((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTask((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTask((prev) => ({
      ...prev,
      stage: e.target.value,
    }));
  };

  const handleStausChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTask((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };

  const handleProgressChange = (value: number) => {
    setNewTask((prev) => ({
      ...prev,
      progress: value,
    }));
  };

  const handleSliderMouseMove = (e: React.MouseEvent) => {
    const sliderRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - sliderRect.left;
    const percentage = (x / sliderRect.width) * 100;
    setTooltipPos({
      x: e.clientX,
      y: e.clientY,
    });
    setNewTask((prev) => ({
      ...prev,
      progress: Math.min(Math.max(percentage, 0), 100),
    }));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "tasks");
        const snapshot = await getDocs(tasksCollection);
        const tasksData = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => parseInt(a.id) - parseInt(b.id)) as Task[];
        setTask(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast({
          title: "Error",
          description: "Failed to fetch tasks. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    };

    fetchTasks();
  }, []);

  const handleSaveTask = async () => {
    if (
      !newTask.name ||
      !newTask.plannedStart ||
      !newTask.plannedEnd ||
      !newTask.actualStart ||
      !newTask.type ||
      !newTask.role ||
      !newTask.stage ||
      !newTask.status ||
      !newTask.risk ||
      !newTask.progress
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (new Date(newTask.actualStart) < new Date(newTask.plannedStart)) {
      toast({
        title: "Validation Error",
        description:
          "Actual Start date cannot be earlier than Planned Start date.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    // Validation for plannedEnd being after plannedStart
    if (new Date(newTask.plannedEnd) <= new Date(newTask.plannedStart)) {
      toast({
        title: "Validation Error",
        description: "Planned End date must be later than Planned Start date.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const tasksCollection = collection(db, "tasks");

      if (newTask.id.includes(".")) {
        // Identify parent ID
        const parentId = newTask.id.split(".").slice(0, -1).join(".");
        console.log("Parent ID being searched for:", parentId);

        // Find parent in local state
        const findParentTask = (
          tasks: Task[],
          targetId: string
        ): Task | null => {
          for (const task of tasks) {
            if (task.id === targetId) return task;
            if (task.subtasks && task.subtasks.length > 0) {
              const found = findParentTask(task.subtasks, targetId);
              if (found) return found;
            }
          }
          return null;
        };

        const parentTask = findParentTask(tasks, parentId);

        if (!parentTask) {
          console.error(`Parent task not found in local state: ${parentId}`);
          throw new Error(`Parent task not found: ${parentId}`);
        }

        console.log("Found parent task:", parentTask);

        // Add subtask to the parent
        const updatedParentTask = {
          ...parentTask,
          subtasks: [...(parentTask.subtasks || []), newTask],
        };

        // Update local state recursively
        const updateTasks = (
          tasks: Task[],
          targetId: string,
          updatedTask: Task
        ): Task[] =>
          tasks.map((task) =>
            task.id === targetId
              ? updatedTask
              : {
                  ...task,
                  subtasks: updateTasks(
                    task.subtasks || [],
                    targetId,
                    updatedTask
                  ),
                }
          );

        const updatedTasks = updateTasks(tasks, parentId, updatedParentTask);

        // Update local state
        setTask(updatedTasks);

        // Save top-level parent document to Firestore
        const topLevelParentId = parentId.split(".")[0]; // Get the top-level parent ID
        const topLevelParent = updatedTasks.find(
          (t) => t.id === topLevelParentId
        );

        if (topLevelParent) {
          const parentRef = doc(tasksCollection, topLevelParentId);
          await setDoc(parentRef, topLevelParent);
          console.log("Updated top-level parent in Firestore:", topLevelParent);
        }

        toast({
          title: "Subtask Saved",
          description: `Subtask "${newTask.name}" added to Task ${parentId}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Handle Parent Task
        const taskRef = doc(tasksCollection, newTask.id);
        await setDoc(taskRef, newTask);

        // Update local state
        setTask((prevTasks) => [...prevTasks, newTask]);

        toast({
          title: "Task Saved",
          description: `Task "${newTask.name}" has been saved.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error saving task:", error);
      toast({
        title: "Error",
        description: `Failed to save task: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateTask = async () => {
    if (
      !newTask.name ||
      !newTask.plannedStart ||
      !newTask.plannedEnd ||
      !newTask.actualStart ||
      !newTask.type ||
      !newTask.role ||
      !newTask.stage ||
      !newTask.status ||
      !newTask.risk
    ) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (new Date(newTask.actualStart) < new Date(newTask.plannedStart)) {
      toast({
        title: "Validation Error",
        description:
          "Actual Start date cannot be earlier than Planned Start date.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (new Date(newTask.plannedEnd) <= new Date(newTask.plannedStart)) {
      toast({
        title: "Validation Error",
        description: "Planned End date must be later than Planned Start date.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (!editingTaskId) {
      toast({
        title: "Error",
        description: "No task selected for update.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const tasksCollection = collection(db, "tasks");

      if (editingTaskId.includes(".")) {
        // Identify parent ID
        const parentId = editingTaskId.split(".").slice(0, -1).join(".");
        console.log("Parent ID being searched for:", parentId);

        // Find parent in local state
        const findParentTask = (
          tasks: Task[],
          targetId: string
        ): Task | null => {
          for (const task of tasks) {
            if (task.id === targetId) return task;
            if (task.subtasks && task.subtasks.length > 0) {
              const found = findParentTask(task.subtasks, targetId);
              if (found) return found;
            }
          }
          return null;
        };

        const parentTask = findParentTask(tasks, parentId);

        if (!parentTask) {
          console.error(`Parent task not found in local state: ${parentId}`);
          throw new Error(`Parent task not found: ${parentId}`);
        }

        console.log("Found parent task:", parentTask);

        // Recursively update the subtasks hierarchy
        const updateSubtasks = (
          taskList: Task[],
          taskId: string,
          updatedTask: Task
        ): Task[] =>
          taskList.map((task) =>
            task.id === taskId
              ? { ...task, ...updatedTask }
              : {
                  ...task,
                  subtasks: updateSubtasks(
                    task.subtasks || [],
                    taskId,
                    updatedTask
                  ),
                }
          );

        const updatedParentTask = {
          ...parentTask,
          subtasks: updateSubtasks(
            parentTask.subtasks || [],
            editingTaskId,
            newTask
          ),
        };

        // Update local state recursively
        const updateTasks = (
          tasks: Task[],
          targetId: string,
          updatedTask: Task
        ): Task[] =>
          tasks.map((task) =>
            task.id === targetId
              ? updatedTask
              : {
                  ...task,
                  subtasks: updateTasks(
                    task.subtasks || [],
                    targetId,
                    updatedTask
                  ),
                }
          );

        const updatedTasks = updateTasks(tasks, parentId, updatedParentTask);

        // Update local state
        setTask(updatedTasks);

        // Save top-level parent document to Firestore
        const topLevelParentId = parentId.split(".")[0]; // Get the top-level parent ID
        const topLevelParent = updatedTasks.find(
          (t) => t.id === topLevelParentId
        );

        if (topLevelParent) {
          const parentRef = doc(tasksCollection, topLevelParentId);
          await setDoc(parentRef, topLevelParent);
          console.log("Updated top-level parent in Firestore:", topLevelParent);
        }

        toast({
          title: "Task Updated",
          description: `Task "${newTask.name}" has been successfully updated.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Handle Parent Task Update
        const taskRef = doc(tasksCollection, editingTaskId);

        // Update Firestore
        await setDoc(taskRef, newTask, { merge: true });

        // Update local state
        setTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editingTaskId ? { ...task, ...newTask } : task
          )
        );

        toast({
          title: "Task Updated",
          description: `Task "${newTask.name}" has been successfully updated.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      setEditingTaskId(null);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: `Failed to update task: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteTask = async () => {
    if (!editingTaskId) {
      toast({
        title: "Error",
        description: "No task selected for deletion.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const tasksCollection = collection(db, "tasks");

      if (editingTaskId.includes(".")) {
        // Identify Parent Task ID
        const parentId = editingTaskId.split(".").slice(0, -1).join(".");
        console.log("Parent ID being searched for:", parentId);

        // Find Parent Task in Local State
        const findParentTask = (
          tasks: Task[],
          targetId: string
        ): Task | null => {
          for (const task of tasks) {
            if (task.id === targetId) return task;
            if (task.subtasks && task.subtasks.length > 0) {
              const found = findParentTask(task.subtasks, targetId);
              if (found) return found;
            }
          }
          return null;
        };

        const parentTask = findParentTask(tasks, parentId);

        if (!parentTask) {
          console.error(`Parent task not found: ${parentId}`);
          throw new Error(`Parent task not found: ${parentId}`);
        }

        console.log("Found parent task:", parentTask);

        // Recursively remove the task from the subtasks hierarchy
        const removeTaskFromSubtasks = (
          taskList: Task[],
          taskId: string
        ): Task[] =>
          taskList
            .filter((task) => task.id !== taskId)
            .map((task) => ({
              ...task,
              subtasks: removeTaskFromSubtasks(task.subtasks || [], taskId),
            }));

        const updatedParentTask = {
          ...parentTask,
          subtasks: removeTaskFromSubtasks(
            parentTask.subtasks || [],
            editingTaskId
          ),
        };

        // Update Local State
        const updateTasks = (
          tasks: Task[],
          targetId: string,
          updatedTask: Task
        ): Task[] =>
          tasks.map((task) =>
            task.id === targetId
              ? updatedTask
              : {
                  ...task,
                  subtasks: updateTasks(
                    task.subtasks || [],
                    targetId,
                    updatedTask
                  ),
                }
          );

        const updatedTasks = updateTasks(tasks, parentId, updatedParentTask);

        setTask(updatedTasks);

        // Save Top-Level Parent to Firestore
        const topLevelParentId = parentId.split(".")[0];
        const topLevelParent = updatedTasks.find(
          (task) => task.id === topLevelParentId
        );

        if (topLevelParent) {
          const parentRef = doc(tasksCollection, topLevelParentId);
          await setDoc(parentRef, topLevelParent);
          console.log("Updated top-level parent in Firestore:", topLevelParent);
        }

        toast({
          title: "Subtask Deleted",
          description: `Subtask "${editingTaskId}" has been successfully deleted.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Handle Parent Task Deletion
        const taskRef = doc(tasksCollection, editingTaskId);

        // Delete Parent Task from Firestore
        await deleteDoc(taskRef);

        // Update Local State
        setTask((prevTasks) =>
          prevTasks.filter((task) => task.id !== editingTaskId)
        );

        toast({
          title: "Task Deleted",
          description: `Task "${editingTaskId}" has been successfully deleted.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      // Close modal and reset state
      setEditingTaskId(null);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: `Failed to delete task: ${error.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderTaskRows = (task: Task, level = 0): React.ReactNode => (
    <React.Fragment key={`task-${task.id}`}>
      <Tr
        fontSize="sm"
        key={task.id}
        bg={selectedTaskId === task.id ? "blue.100" : "white"}
        onClick={() => onSelectTask(task.id)}
        onDoubleClick={() => handleRowDoubleClick(task)}
        _hover={{ bg: "gray.100", cursor: "pointer" }}
      >
        <Td
          borderColor="gray.200"
          borderRightWidth="1px"
          textAlign="center"
          height="60px"
        >
          {task.id}
        </Td>

        <Td
          borderColor="gray.200"
          borderRightWidth="1px"
          textAlign="center"
          height="60px"
        >
          {task.type === "task" ? `${task.stage}` : ""}
        </Td>
        <Td
          borderColor="gray.200"
          borderRightWidth="1px"
          textAlign="center"
          height="60px"
          onClick={() => toggleExpandedTask(task.id)}
          cursor="pointer"
          display="flex"
          alignItems="center"
          paddingLeft={`calc(10px + ${level * 20}px)`}
        >
          {task.type === "project" ? (
            <>
              <FontAwesomeIcon
                icon={
                  expandedTaskIds.has(task.id) ? faMinusSquare : faPlusSquare
                }
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpandedTask(task.id);
                }}
                style={{
                  marginRight: "8px",
                  cursor: "pointer",
                  color: expandedTaskIds.has(task.id) ? "red" : "green", // Conditional color
                }}
              />

              <FontAwesomeIcon
                color={level === 0 ? "orange" : "blue"}
                icon={expandedTaskIds.has(task.id) ? faFolderOpen : faFolder}
                style={{ marginRight: "8px" }}
              />
            </>
          ) : (
            <FontAwesomeIcon
              icon={faFileAlt}
              color="blue"
              style={{ marginRight: "8px" }}
            />
          )}

          <Box
            as="span"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            maxWidth="230px"
            textAlign={"left"}
          >
            {task.name}
          </Box>
        </Td>

        <Td borderColor="gray.200" borderRightWidth="1px" textAlign="center">
          {task.plannedStart}
        </Td>
        <Td borderColor="gray.200" borderRightWidth="1px" textAlign="center">
          {task.plannedEnd}
        </Td>
        <Td borderColor="gray.200" borderRightWidth="1px" textAlign="center">
          {task.actualStart}
        </Td>
        <Td borderColor="gray.200" borderRightWidth="1px" textAlign="center">
          {task.actualEnd}
        </Td>
        <Td borderColor="gray.200" borderRightWidth="1px" textAlign="center">
          {task.duration}
        </Td>
        <Td borderColor="gray.200" borderRightWidth="1px" textAlign="center">
          {task.dependency}
        </Td>
        <Td borderColor="gray.200" borderRightWidth="1px" textAlign="center">
          {task.risk}
        </Td>
        <Td borderColor="gray.200" borderRightWidth="1px" textAlign="center">
          <Box width="100%">
            <Progress
              height="5px"
              width={`${task.progress}%`}
              backgroundColor={
                task.progress < 30
                  ? "red.400"
                  : task.progress < 70
                  ? "yellow.400"
                  : "green.400"
              }
              borderRadius="md"
            />
          </Box>
        </Td>
        <Td
          borderColor="gray.200"
          borderRightWidth="1px"
          textAlign="center"
          minWidth="20px"
          cursor="pointer"
          color="blue.500"
          _hover={{ color: "blue.600", transform: "scale(1.3)" }}
        >
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => handleAddTaskClick(task.id)}
            size="sm"
          />
        </Td>
      </Tr>
      {/* Render Subtasks if the task is expanded */}
      {expandedTaskIds.has(task.id) &&
        task.subtasks &&
        task.subtasks.map((subtask) => renderTaskRows(subtask, level + 1))}
    </React.Fragment>
  );

  return (
    <Box width={width} p={2} overflowY="auto" height="100vh">
      <Flex gap={5}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Task Details
        </Text>
        <Button
          onClick={() => handleAddTaskClick()}
          bg="teal.500"
          color="white"
          size="sm"
          fontWeight="bold"
          borderRadius="md"
          _hover={{
            bg: "teal.600",
            transform: "scale(1.05)",
          }}
          _active={{
            bg: "teal.700",
            transform: "scale(1.02)",
          }}
        >
          + Add Task
        </Button>
      </Flex>

      <Table
        border={"1px"}
        borderColor={"gray.200"}
        variant="simple"
        colorScheme="gray"
      >
        <Thead>
          <Tr fontSize="5px">
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"80px"}
            >
              WBS
            </Th>
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"80px"}
            >
              Stage
            </Th>
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"250px"}
              height={`${
                zoomLevel === "weeks"
                  ? "39px"
                  : `${zoomLevel === "days" ? "21px" : "83px"}`
              }`}
            >
              Task Name
            </Th>

            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"160px"}
            >
              Planned Start
            </Th>
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"160px"}
            >
              Planned End
            </Th>
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"150px"}
            >
              Actual Start
            </Th>
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"150px"}
            >
              Actual End
            </Th>
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"150px"}
            >
              Duration
            </Th>
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"150px"}
            >
              Dependency
            </Th>
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"120px"}
            >
              Risk
            </Th>
            <Th
              borderColor={"gray.200"}
              borderRightWidth="1px"
              textAlign="center"
              minWidth={"120px"}
            >
              Progress
            </Th>

            <Th
              borderColor="gray.200"
              borderRightWidth="1px"
              textAlign="center"
              minWidth="20px"
              cursor="pointer"
              color="blue.500"
              _hover={{ color: "blue.600", transform: "scale(1.3)" }}
            >
              <FontAwesomeIcon
                onClick={() => handleAddTaskClick()}
                icon={faPlus}
                size="lg"
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>{tasks.map((task) => renderTaskRows(task))}</Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="lg">
        <ModalOverlay />
        <ModalContent minWidth={650} borderRadius="md" boxShadow="xl">
          <ModalHeader
            fontSize="lg"
            fontWeight="semibold"
            color="teal.600"
            fontFamily="'Inter', sans-serif"
          >
            Add New Task
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} fontFamily="'Inter', sans-serif">
            <FormControl id="taskName" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium">
                Task Name
              </FormLabel>
              <Input
                value={newTask.name}
                onChange={handleInputChange}
                name="name"
                placeholder="Enter task name"
                fontSize="sm"
                p={3}
                required
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              />
            </FormControl>

            <FormControl mt={3} id="risk" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium">
                Type
              </FormLabel>
              <Select
                value={newTask.type}
                onChange={handleTypeChange}
                name="risk"
                fontSize="sm"
                p={1}
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="task">task</option>
                <option value="project">project</option>
                <option value="milestone">milestone</option>
              </Select>
            </FormControl>

            <FormControl mt={5} id="planned" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium">
                Planned
              </FormLabel>
              <Flex justify="space-between" align="center" mt={3}>
                <Box flex="1" mr={2}>
                  <FormLabel textAlign="center" fontSize="xs">
                    Start
                  </FormLabel>
                  <Input
                    type="date"
                    value={newTask.plannedStart}
                    onChange={handleInputChange}
                    name="plannedStart"
                    fontSize="sm"
                    p={3}
                    borderColor="gray.300"
                    _hover={{ borderColor: "teal.500" }}
                    _focus={{ borderColor: "teal.500" }}
                  />
                </Box>

                <Box flex="1" mx={2}>
                  <FormLabel textAlign="center" fontSize="xs">
                    Duration (in days)
                  </FormLabel>
                  <Flex alignItems="center" justify="center">
                    <Button
                      onClick={() => handleDurationChange(-1)}
                      fontSize="sm"
                      variant="outline"
                      colorScheme="teal"
                      _hover={{ bg: "teal.100" }}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={newTask.duration === 0 && !isFocused ? "0" : newTask.duration || ""}
                      onChange={handleDurationInputChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      mx={3}
                      maxLength={6}
                      width="60px"
                      textAlign="center"
                      fontSize="sm"
                      p={2}
                      borderColor="gray.300"
                      _hover={{ borderColor: "teal.500" }}
                      _focus={{ borderColor: "teal.500" }}
                    />
                    <Button
                      onClick={() => handleDurationChange(1)}
                      fontSize="sm"
                      variant="outline"
                      colorScheme="teal"
                      _hover={{ bg: "teal.100" }}
                    >
                      +
                    </Button>
                  </Flex>
                </Box>

                <Box flex="1" ml={2}>
                  <FormLabel textAlign="center" fontSize="xs">
                    End
                  </FormLabel>
                  <Input
                    type="date"
                    value={newTask.plannedEnd}
                    isReadOnly
                    disabled
                    fontSize="sm"
                    p={3}
                    borderColor="gray.300"
                    _focus={{ borderColor: "gray.300" }}
                  />
                </Box>
              </Flex>
            </FormControl>

            <FormControl mt={5} id="actual" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium">
                Actual
              </FormLabel>
              <Flex justify="space-between" align="center" mt={3}>
                <Box flex="1" mr={2}>
                  <FormLabel textAlign="center" fontSize="xs">
                    Start
                  </FormLabel>
                  <Input
                    type="date"
                    value={newTask.actualStart}
                    onChange={handleInputChange}
                    name="actualStart"
                    fontSize="sm"
                    p={3}
                    borderColor="gray.300"
                    _hover={{ borderColor: "teal.500" }}
                    _focus={{ borderColor: "teal.500" }}
                  />
                </Box>

                <Box flex="1" mx={2}>
                  <FormLabel textAlign="center" fontSize="xs">
                    Duration (in days)
                  </FormLabel>
                  <Flex alignItems="center" justify="center">
                    <Button
                      onClick={() => handleActualDurationChange(-1)}
                      fontSize="sm"
                      variant="outline"
                      colorScheme="teal"
                      _hover={{ bg: "teal.100" }}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={newTask.actualDuration === 0 && !isFocused ? "0" : newTask.actualDuration || ""}
                      onChange={handleActualDurationInputChange}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      mx={3}
                      maxLength={6}
                      width="60px"
                      textAlign="center"
                      fontSize="sm"
                      p={2}
                      borderColor="gray.300"
                      _hover={{ borderColor: "teal.500" }}
                      _focus={{ borderColor: "teal.500" }}
                    />
                    <Button
                      onClick={() => handleActualDurationChange(1)}
                      fontSize="sm"
                      variant="outline"
                      colorScheme="teal"
                      _hover={{ bg: "teal.100" }}
                    >
                      +
                    </Button>
                  </Flex>
                </Box>

                <Box flex="1" ml={2}>
                  <FormLabel textAlign="center" fontSize="xs">
                    End
                  </FormLabel>
                  <Input
                    type="date"
                    value={newTask.actualEnd}
                    isReadOnly
                    disabled
                    fontSize="sm"
                    p={3}
                    borderColor="gray.300"
                    _focus={{ borderColor: "gray.300" }}
                  />
                </Box>
              </Flex>
            </FormControl>

            <FormControl mt={5} id="dependency" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium">
                Dependency
              </FormLabel>
              <Input
                value={newTask.dependency}
                onChange={handleInputChange}
                name="dependency"
                placeholder="Dependency task"
                fontSize="sm"
                p={3}
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              />
            </FormControl>

            <FormControl mt={3} id="role" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium">
                Role
              </FormLabel>
              <Select
                value={newTask.role}
                onChange={handleRoleChange}
                name="role"
                fontSize="sm"
                p={1}
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="coordinator">Coordinator</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </Select>
            </FormControl>

            <FormControl mt={3} id="stage" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium">
                Stage
              </FormLabel>
              <Select
                value={newTask.stage}
                onChange={handleStageChange}
                name="stage"
                fontSize="sm"
                p={1}
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="DR-1">DR-1</option>
                <option value="DR-2">DR-2</option>
                <option value="DR`">DR-3</option>
              </Select>
            </FormControl>

            <FormControl mt={3} id="status" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium">
                Status
              </FormLabel>
              <Select
                value={newTask.status}
                onChange={handleStausChange}
                name="status"
                fontSize="sm"
                p={1}
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="Not-started">Not Started</option>
                <option value="In-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="delay">Delay</option>
              </Select>
            </FormControl>

            <FormControl mt={3} id="risk" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium">
                Risk Level
              </FormLabel>
              <Select
                value={newTask.risk}
                onChange={handleRiskChange}
                name="risk"
                fontSize="sm"
                p={1}
                borderColor="gray.300"
                _hover={{ borderColor: "teal.500" }}
                _focus={{ borderColor: "teal.500" }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FormControl>

            <FormControl mt={5} id="progress">
              <FormLabel fontSize="sm" fontWeight="medium">
                Progress
              </FormLabel>
              <Box position="relative" onMouseMove={handleSliderMouseMove}>
                <Slider
                  value={newTask.progress}
                  onChange={handleProgressChange}
                  min={0}
                  max={100}
                  step={1}
                  aria-label="Progress slider"
                  size="sm"
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Box
                  ref={tooltipRef}
                  position="absolute"
                  top={-2}
                  left={90}
                  transform="translateX(-50%) translateY(-100%)"
                  bg="gray.700"
                  color="white"
                  height={7}
                  width={7}
                  borderRadius="50%"
                  padding="4px"
                  py={2}
                  textAlign="center"
                  fontSize="9px"
                  opacity={newTask.progress === 0 ? 0 : 1}
                >
                  {Math.round(newTask.progress)}%
                </Box>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Flex gap={2}>
              <Button
                colorScheme="teal"
                onClick={editingTaskId ? handleUpdateTask : handleSaveTask}
                fontSize="md"
              >
                {editingTaskId ? "Update Task" : "Save Task"}
              </Button>
              <Button variant="ghost" onClick={handleCloseModal} fontSize="sm">
                Cancel
              </Button>
            </Flex>
            {editingTaskId && (
              <Button
                colorScheme="red"
                onClick={handleDeleteTask}
                fontSize="sm"
              >
                Delete Task
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const TimelinePanel: React.FC<{
  width: string;
  selectedTaskId: string;
  zoomLevel: string;
  expandedTaskId: string | null;
  tasks: Task[];
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;
  onZoomChange: (level: string) => void;
}> = ({
  zoomLevel,
  onZoomChange,
  width,
  selectedTaskId,
  expandedTaskId,
  tasks,
  setTask,
}) => {
  const [selectedConnection, setSelectedConnection] = useState<{
    fromId: string;
    toId: string;
    fromTaskName: string;
    toTaskName: string;
  } | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const getTaskNameById = (tasks: Task[], taskId: string): string | null => {
    for (const task of tasks) {
      if (task.id === taskId) {
        return task.name; // Return the name if the ID matches
      }
      if (task.subtasks && task.subtasks.length > 0) {
        const subtaskName = getTaskNameById(task.subtasks, taskId);
        if (subtaskName) {
          return subtaskName; // Return if found in subtasks
        }
      }
    }
    return null; // Return null if not found
  };

  const handleConnectionDoubleClick = (fromId: string, toId: string) => {
    const fromTaskName = getTaskNameById(tasks, fromId) || "Unknown Task";
    const toTaskName = getTaskNameById(tasks, toId) || "Unknown Task";

    if (fromId && toId) {
      setSelectedConnection({
        fromId,
        toId,
        fromTaskName,
        toTaskName,
      });

      onOpen();
    } else {
      console.warn("Invalid connection IDs:", { fromId, toId });
      return;
    }
  };

  const handleSaveConnection = () => {
    console.log("Connection saved:", selectedConnection);
    onClose(); // Close the modal after saving
  };

  const [draggingConnection, setDraggingConnection] = useState<{
    fromId: string;
    startX: number;
    startY: number;
    endX?: number; // Make it optional to handle initialization
    endY?: number; // Make it optional to handle initialization
    point: "start" | "end";
  } | null>(null);

  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [connections, setConnections] = useState<
    {
      fromId: string;
      toId: string;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }[]
  >([]);

  console.log("Connections:", connections);

  const handleCircleDragStart = (
    e: React.MouseEvent<SVGCircleElement>,
    taskId: string,
    point: "start" | "end"
  ) => {
    const circle = e.currentTarget.getBoundingClientRect();
    const svg = timelineRef.current?.getBoundingClientRect();

    if (svg) {
      const startX = circle.x - svg.x + circle.width / 2; // Center X
      const startY = circle.y - svg.y + circle.height / 2; // Center Y

      setDraggingConnection({
        fromId: taskId,
        startX,
        startY,
        point,
      });
    }
  };

  const handleCircleDragEnd = (
    e: React.MouseEvent<SVGCircleElement>,
    toId: string
  ) => {
    if (!draggingConnection) return; // No active drag connection

    const circle = e.currentTarget.getBoundingClientRect(); // Get target circle
    const svg = timelineRef.current?.getBoundingClientRect();

    if (svg) {
      const endX = circle.x - svg.x + circle.width / 2; // Center X
      const endY = circle.y - svg.y + circle.height / 2; // Center Y

      // Check for duplicate connections
      setConnections((prev) => {
        const exists = prev.some(
          (conn) =>
            conn.fromId === draggingConnection.fromId && conn.toId === toId
        );
        if (exists) return prev;

        // Add the new connection
        return [
          ...prev,
          {
            fromId: draggingConnection.fromId,
            toId,
            startX: draggingConnection.startX,
            startY: draggingConnection.startY,
            endX,
            endY,
          },
        ];
      });
    }

    setDraggingConnection(null); // Reset the temporary connection
  };

  const handleMouseMove = (coords: { clientX: number; clientY: number }) => {
    if (draggingConnection) {
      const svg = timelineRef.current?.getBoundingClientRect();

      if (svg) {
        const endX = coords.clientX - svg.x;
        const endY = coords.clientY - svg.y;

        setDraggingConnection((prev) =>
          prev ? { ...prev, endX, endY } : null
        );
      }
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setDraggingConnection(null);

    const nativeMouseMoveHandler = (e: MouseEvent) => {
      handleMouseMove({
        clientX: e.clientX,
        clientY: e.clientY,
      });
    };

    if (draggingConnection) {
      window.addEventListener("mousemove", nativeMouseMoveHandler);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", nativeMouseMoveHandler);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingConnection]);

  const calculateIntermediatePoints = (
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    const waypoints = [[startX, startY]]; // Start point

    // Example logic for intermediate waypoints (adjust based on actual layout):
    if (Math.abs(endX - startX) > 50) {
      // If there's a horizontal distance, add a waypoint to navigate around obstacles
      const midX = (startX + endX) / 2;
      waypoints.push([midX, startY]); // Go horizontally
      waypoints.push([midX, endY]); // Then vertically
    }

    waypoints.push([endX, endY]); // End point
    return waypoints;
  };

  const getConnectionType = (
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ) => {
    if (fromX === toX) return "vertical"; // Perfect vertical line
    if (fromY === toY) return "horizontal"; // Perfect horizontal line
    if (fromX < toX) return "L-shape"; // L-shape connection
    if (fromX > toX) return "reverse-L"; // Reverse L-shape connection
    return "complex"; // Handle complex cases if none of the above
  };

  const calculateArrowPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    type: string,
    offset = 10 // Offset to clear bars
  ) => {
    switch (type) {
      case "horizontal":
        return `M ${startX},${startY} L ${endX},${endY}`; // Direct horizontal line

      case "vertical":
        return `M ${startX},${startY} L ${startX},${endY}`; // Direct vertical line

      case "L-shape": {
        const midX = startX; // Vertical first, then horizontal
        return `M ${startX},${startY} L ${midX},${endY} L ${endX},${endY}`;
      }

      case "reverse-L": {
        const midX = endX; // Horizontal first, then vertical
        return `M ${startX},${startY} L ${midX},${startY} L ${endX},${endY}`;
      }

      case "complex": {
        const midX = (startX + endX) / 2; // Midpoint to create a smooth curve
        const midY = (startY + endY) / 2;
        return `M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`;
      }

      default:
        return `M ${startX},${startY} L ${endX},${endY}`; // Fallback to direct line
    }
  };

  const isVisible = (taskId: string): boolean => {
    // Top-level tasks are always visible
    if (!taskId.includes(".")) return true;

    // Check if any parent in the hierarchy is expanded
    const parts = taskId.split(".");
    for (let i = parts.length - 1; i > 0; i--) {
      const parentId = parts.slice(0, i).join(".");
      if (!expandedTaskIds.has(parentId)) {
        // If a parent is collapsed, the task is not visible
        return false;
      }
    }

    return true;
  };

  const saveConnectionsToFirebase = async (
    connections: {
      fromId: string;
      toId: string;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }[]
  ) => {
    try {
      const connectionsCollection = collection(db, "connections");

      // Save each connection with a unique ID
      const savePromises = connections.map((connection) =>
        setDoc(
          doc(connectionsCollection, `${connection.fromId}-${connection.toId}`),
          connection
        )
      );

      await Promise.all(savePromises);

      console.log("Connections saved to Firebase successfully.");
    } catch (error) {
      console.error("Error saving connections to Firebase:", error);
      toast({
        title: "Error",
        description: "Failed to save connections to Firebase.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const fetchConnectionsFromFirebase = async () => {
    try {
      const connectionsCollection = collection(db, "connections");
      const snapshot = await getDocs(connectionsCollection);

      const fetchedConnections = snapshot.docs.map((doc) => doc.data());

      console.log("Fetched connections from Firebase:", fetchedConnections);

      // Return connections in the desired format
      return fetchedConnections.map((connection) => ({
        fromId: connection.fromId,
        toId: connection.toId,
        startX: connection.startX,
        startY: connection.startY,
        endX: connection.endX,
        endY: connection.endY,
      }));
    } catch (error) {
      console.error("Error fetching connections from Firebase:", error);
      toast({
        title: "Error",
        description: "Failed to fetch connections from Firebase.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return [];
    }
  };

  const handleDeleteConnection = async () => {
    if (!selectedConnection) return;

    try {
      const connectionId = `${selectedConnection.fromId}-${selectedConnection.toId}`;
      const connectionDoc = doc(db, "connections", connectionId);

      // Delete the document from Firebase
      await deleteDoc(connectionDoc);
      setConnections((prevConnections) =>
        prevConnections.filter(
          (connection) =>
            !(
              connection.fromId === selectedConnection.fromId &&
              connection.toId === selectedConnection.toId
            )
        )
      );

      setSelectedConnection(null);
      onClose();

      toast({
        title: "Connection Deleted",
        description: "The selected connection has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error deleting connection:", error);
      toast({
        title: "Error",
        description: "Failed to delete the selected connection.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const getVisibleConnections = () =>
    connections.filter(({ fromId, toId }) => {
      // Ensure both ends of the connection are visible
      return isVisible(fromId) && isVisible(toId);
    });
  console.log("selected collections", selectedConnection);

  useEffect(() => {
    saveConnectionsToFirebase(connections);
  }, [connections]);

  useEffect(() => {
    const loadConnections = async () => {
      const fetchedConnections = await fetchConnectionsFromFirebase();
      setConnections(fetchedConnections);
    };

    loadConnections();
  }, []);

  const calculatePath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    if (startX < endX && startY > endY) {
      // L-shaped line (start-to-end)
      return `M ${startX},${startY} L ${startX},${endY} L ${endX},${endY}`;
    } else if (startX > endX && startY < endY) {
      // Reversed L-shaped line
      return `M ${startX},${startY} L ${endX},${startY} L ${endX},${endY}`;
    } else if (startX === endX || startY === endY) {
      // Straight line
      return `M ${startX},${startY} L ${endX},${endY}`;
    } else {
      // Zigzag line
      const midX = (startX + endX) / 2;
      return `M ${startX},${startY} L ${midX},${startY} L ${midX},${endY} L ${endX},${endY}`;
    }
  };

  const renderConnections = () => {
    const visibleConnections = getVisibleConnections();

    return visibleConnections.map((connection, index) => {
      const { startX, startY, endX, endY, fromId, toId } = connection;

      if (
        startX == null ||
        startY == null ||
        endX == null ||
        endY == null ||
        isNaN(startX) ||
        isNaN(startY) ||
        isNaN(endX) ||
        isNaN(endY)
      ) {
        console.warn("Invalid connection coordinates:", connection);
        return null;
      }

      const path = calculatePath(startX, startY, endX, endY);

      return (
        <path
          key={index}
          d={path}
          fill="none"
          stroke="orange"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
          pointerEvents="visibleStroke"
          style={{ cursor: "pointer" }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleConnectionDoubleClick(fromId, toId);
          }}
        />
      );
    });
  };

  const renderTemporaryLine = () => {
    if (!draggingConnection || draggingConnection.endX === undefined)
      return null;

    return (
      <line
        x1={draggingConnection.startX}
        y1={draggingConnection.startY}
        x2={draggingConnection.endX}
        y2={draggingConnection.endY}
        stroke="gray"
        strokeWidth={2}
        strokeDasharray="4"
        markerEnd="url(#arrowhead)"
      />
    );
  };


  

  const [isEditMode, setIsEditMode] = useState(false);
  const { expandedTaskIds, toggleExpandedTask } = useTaskContext();
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const [temporaryConnectionLine, setTemporaryConnectionLine] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  } | null>(null);

  const [tooltipData, setTooltipData] = useState<{
    x: number;
    y: number;
    content: React.ReactNode;
  } | null>(null);

  const handleBarClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    task: Task,
    type: "planned" | "actual"
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipWidth = 250;
    const tooltipHeight = 150;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let calculatedX = rect.left + event.nativeEvent.offsetX;
    let calculatedY = rect.top + event.nativeEvent.offsetY;

    if (calculatedX + tooltipWidth > viewportWidth) {
      calculatedX = viewportWidth - tooltipWidth - 10;
    }

    if (calculatedY + tooltipHeight > viewportHeight) {
      calculatedY = viewportHeight - tooltipHeight - 10;
    }

    if (calculatedY < 0) {
      calculatedY = 10;
    }

    const tooltipContent = (
      <Box p={3} bg="white" borderRadius="md" boxShadow="lg" minWidth="250px">
        <Flex align="center" mb={2}>
          <Box
            w="8px"
            h="8px"
            bg={type === "planned" ? "blue.400" : "green.400"}
            borderRadius="full"
            mr={2}
          />
          <Text fontWeight="bold" fontSize="md" color="gray.700">
            {type === "planned"
              ? "Planned Task Details"
              : "Actual Task Details"}
          </Text>
        </Flex>
        <Text fontSize="sm" color="gray.600">
          <b>Task Name:</b> {task.name}
        </Text>
        <Text fontSize="sm" color="gray.600">
          <b>Progress:</b> {task.inlineProgress}%
        </Text>
        <Text fontSize="sm" color="gray.600">
          <b>{type === "planned" ? "Planned Start" : "Actual Start"}:</b>{" "}
          {new Date(
            type === "planned" ? task.plannedStart : task.actualStart
          ).toLocaleDateString()}
        </Text>
        <Text fontSize="sm" color="gray.600">
          <b>{type === "planned" ? "Planned End" : "Actual End"}:</b>{" "}
          {new Date(
            type === "planned" ? task.plannedEnd : task.actualEnd
          ).toLocaleDateString()}
        </Text>
      </Box>
    );

    setTooltipData({
      x: calculatedX,
      y: calculatedY,
      content: tooltipContent,
    });
  };

  const closeTooltip = () => {
    setTooltipData(null);
  };

  const handleSubtaskBarClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    subtask: Task,
    type: "planned" | "actual"
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const tooltipContent = (
      <Box p={3} bg="white" borderRadius="md" boxShadow="lg" minWidth="250px">
        <Flex align="center" mb={2}>
          <Box
            w="8px"
            h="8px"
            bg={type === "planned" ? "blue.400" : "green.400"}
            borderRadius="full"
            mr={2}
          />
          <Text fontWeight="bold" fontSize="md" color="gray.700">
            {type === "planned"
              ? "Planned Subtask Details"
              : "Actual Subtask Details"}
          </Text>
        </Flex>
        <Text fontSize="sm" color="gray.600">
          <b>Subtask Name:</b> {subtask.name}
        </Text>
        <Text fontSize="sm" color="gray.600">
          <b>Progress:</b> {subtask.inlineProgress}%
        </Text>
        <Text fontSize="sm" color="gray.600">
          <b>{type === "planned" ? "Planned Start" : "Actual Start"}:</b>{" "}
          {new Date(
            type === "planned" ? subtask.plannedStart : subtask.actualStart
          ).toLocaleDateString()}
        </Text>
        <Text fontSize="sm" color="gray.600">
          <b>{type === "planned" ? "Planned End" : "Actual End"}:</b>{" "}
          {new Date(
            type === "planned" ? subtask.plannedEnd : subtask.actualEnd
          ).toLocaleDateString()}
        </Text>
      </Box>
    );

    setTooltipData({
      x: rect.left + event.nativeEvent.offsetX,
      y: rect.top + event.nativeEvent.offsetY,
      content: tooltipContent,
    });
  };

  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineWidth, setTimelineWidth] = useState(0);

  const minDate = new Date(
    Math.min(...tasks.map((task) => new Date(task.plannedStart).getTime()))
  );
  const maxDate = new Date(
    Math.max(...tasks.map((task) => new Date(task.plannedEnd).getTime()))
  );

  const generateDateRange = (
    minDate: Date,
    maxDate: Date,
    zoomLevel: string
  ) => {
    const range = [];
    let currentDate = new Date(minDate);

    while (currentDate <= maxDate) {
      range.push(currentDate.toISOString().split("T")[0]);
      switch (zoomLevel) {
        case "days":
          currentDate.setDate(currentDate.getDate() + 1);
          break;
        case "weeks":
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case "months":
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        case "quarters":
          currentDate.setMonth(currentDate.getMonth() + 3);
          break;
        case "years":
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          break;
        default:
          currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return range;
  };

  const dateRange = generateDateRange(minDate, maxDate, zoomLevel);

  useEffect(() => {
    setTimelineWidth(dateRange.length * 100); // Fixed width of 100px per cell
  }, [dateRange]);

  const calculateCirclePosition = (task: Task, point: "start" | "end") => {
    const barX = calculateBarPositionAndWidth(
      task.actualStart,
      task.actualEnd,
      minDate.toISOString(),
      maxDate.toISOString(),
      timelineWidth,
      dateRange
    ).position;

    const barWidth = calculateBarPositionAndWidth(
      task.actualStart,
      task.actualEnd,
      minDate.toISOString(),
      maxDate.toISOString(),
      timelineWidth,
      dateRange
    ).width;

    const barHeight = 14; // Bar height
    const circleRadius = 5;

    if (point === "start") {
      return {
        x: barX - circleRadius,
        y: barHeight / 2,
      };
    }

    if (point === "end") {
      return {
        x: barX + barWidth + circleRadius,
        y: barHeight / 2,
      };
    }

    return { x: 0, y: 0 }; // Fallback
  };

  const calculateBarPosition = (date: string, timelineWidth: number) => {
    const totalDuration =
      new Date(maxDate).getTime() - new Date(minDate).getTime();
    const elapsedTime = new Date(date).getTime() - new Date(minDate).getTime();
    return (elapsedTime / totalDuration) * timelineWidth;
  };

  const calculateBarCenter = (task: Task) => {
    const rowElement = document.querySelector(`[data-task-id="${task.id}"]`);
    if (rowElement) {
      const rowRect = rowElement.getBoundingClientRect();
      return rowRect.top + rowRect.height / 2; // Center of the row
    }
    return 0; // Fallback
  };

  // const updateConnections = (tasks: Task[]) => {
  //   const updatedConnections = connections.map((connection) => {
  //     const fromTask = tasks.find((t) => t.id === connection.fromId);
  //     const toTask = tasks.find((t) => t.id === connection.toId);

  //     if (!fromTask || !toTask) return connection; // Skip if tasks are missing

  //     const startX = calculateBarPosition(fromTask.actualStart, timelineWidth);
  //     const startY = calculateBarCenter(fromTask);
  //     const endX = calculateBarPosition(toTask.actualStart, timelineWidth);
  //     const endY = calculateBarCenter(toTask);

  //     return {
  //       ...connection,
  //       startX,
  //       startY,
  //       endX,
  //       endY,
  //     };
  //   });

  //   setConnections(updatedConnections);

  // };

  // Utility functions



  const updateConnectionCoordinates = (taskId: string, newX: any, newY: any) => {
    setConnections((prevConnections) =>
      prevConnections.map((connection) => {
        if (connection.fromId === taskId) {
          return {
            ...connection,
            startX: newX,
            startY: newY,
          };
        } else if (connection.toId === taskId) {
          return {
            ...connection,
            endX: newX,
            endY: newY,
          };
        }
        return connection;
      })
    );
  };


  const updateConnectionsOnDrag = (taskId: string) => {
    setConnections((prevConnections) =>
      prevConnections.map((connection) => {
        // Update `startX`, `startY` if the task is the "from" task
        if (connection.fromId === taskId) {
          const fromCircle = document.getElementById(`${taskId}-start`);
          if (fromCircle) {
            const rect = fromCircle.getBoundingClientRect();
            const svg = timelineRef.current?.getBoundingClientRect();
            if (svg) {
              return {
                ...connection,
                startX: rect.x - svg.x + rect.width / 2,
                startY: rect.y - svg.y + rect.height / 2,
              };
            }
          }
        }
  
        // Update `endX`, `endY` if the task is the "to" task
        if (connection.toId === taskId) {
          const toCircle = document.getElementById(`${taskId}-end`);
          if (toCircle) {
            const rect = toCircle.getBoundingClientRect();
            const svg = timelineRef.current?.getBoundingClientRect();
            if (svg) {
              return {
                ...connection,
                endX: rect.x - svg.x + rect.width / 2,
                endY: rect.y - svg.y + rect.height / 2,
              };
            }
          }
        }
  
        return connection; // Return unchanged connection if not related to this task
      })
    );
  };
  

  const handleDragStop = async (task: Task, dragX: number) => {
    const timelineDuration =
      new Date(maxDate).getTime() - new Date(minDate).getTime();
    const daysMoved = Math.round(
      (dragX / timelineWidth) * (timelineDuration / (1000 * 60 * 60 * 24))
    );
  
    const updateTaskDates = (tasks: Task[], targetTaskId: string): Task[] =>
      tasks.map((t) => {
        if (t.id === targetTaskId) {
          return {
            ...t,
            actualStart: new Date(
              new Date(t.actualStart).getTime() + daysMoved * 86400000
            )
              .toISOString()
              .slice(0, 10),
            actualEnd: new Date(
              new Date(t.actualEnd).getTime() + daysMoved * 86400000
            )
              .toISOString()
              .slice(0, 10),
          };
        }
  
        // Recursively update subtasks if they exist
        if (t.subtasks && t.subtasks.length > 0) {
          return {
            ...t,
            subtasks: updateTaskDates(t.subtasks, targetTaskId),
          };
        }
  
        return t;
      });
  
    const updatedTasks = updateTaskDates(tasks, task.id);
  
    setTask(updatedTasks); // Update local state immediately
  
    // Separate Firestore update logic
    try {
      const tasksCollection = collection(db, "tasks");
  
      // Find the top-level task to update in Firestore
      const findTopLevelTask = (tasks: Task[], id: string): Task | null => {
        for (const t of tasks) {
          if (t.id === id) return t;
          if (t.subtasks && t.subtasks.length > 0) {
            const found = findTopLevelTask(t.subtasks, id);
            if (found) return found;
          }
        }
        return null;
      };
  
      if (task.id.includes(".")) {
        const parentId = task.id.split(".").slice(0, -1).join(".");
        const topLevelParentId = parentId.split(".")[0]; // Top-level parent
        const topLevelTask = findTopLevelTask(updatedTasks, topLevelParentId);
  
        if (topLevelTask) {
          const parentRef = doc(tasksCollection, topLevelParentId);
          await setDoc(parentRef, topLevelTask, { merge: true });
          console.log("Updated top-level parent in Firestore:", topLevelTask);
        }
      } else {
        // Update the top-level task directly
        const taskRef = doc(tasksCollection, task.id);
        const updatedTask = updatedTasks.find((t) => t.id === task.id);
        if (updatedTask) {
          await setDoc(taskRef, updatedTask, { merge: true });
          console.log("Task updated in Firestore:", updatedTask);
        }
      }
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
    }

updateConnectionsOnDrag(task.id);

  };

  const calculateTaskXPosition = (task: Task, dragX: number): number => {
    const timelineDuration =
      new Date(maxDate).getTime() - new Date(minDate).getTime();
    const daysFromStart = (dragX / timelineWidth) * (timelineDuration / (1000 * 60 * 60 * 24));
    const newStart = new Date(minDate).getTime() + daysFromStart * 86400000;
    return ((newStart - new Date(minDate).getTime()) / timelineDuration) * timelineWidth;
  };
  
  const calculateTaskYPosition = (task: Task): number => {
    const taskHeight = 60; // Height of each row
    const taskIndex = tasks.findIndex((t) => t.id === task.id);
    return taskIndex * taskHeight + taskHeight / 2; // Center within the row
  };
  
  

  const calculateBarWidth = (
    taskStart: string,
    taskEnd: string,
    cellStart: string,
    cellEnd: string,
    cellWidth: number
  ): string => {
    const taskStartTime = Math.max(
      new Date(taskStart).getTime(),
      new Date(cellStart).getTime()
    );
    const taskEndTime = Math.min(
      new Date(taskEnd).getTime(),
      new Date(cellEnd).getTime()
    );
    const taskDuration = Math.max(taskEndTime - taskStartTime, 0);
    const cellDuration =
      new Date(cellEnd).getTime() - new Date(cellStart).getTime();
    return `${(taskDuration / cellDuration) * cellWidth}px`;
  };

  const calculateBarPositionAndWidth = (
    taskStart: string,
    taskEnd: string,
    timelineStart: string,
    timelineEnd: string,
    totalTimelineWidth: number,
    dateRange: string[],
    isYearsZoomLevel: boolean = false
  ) => {
    const timelineStartTime = new Date(timelineStart).getTime();
    const timelineEndTime = new Date(timelineEnd).getTime();
    const taskStartTime = new Date(taskStart).getTime();
    const taskEndTime = new Date(taskEnd).getTime();

    const clampedStart = Math.max(taskStartTime, timelineStartTime);
    const clampedEnd = Math.min(taskEndTime, timelineEndTime);

    if (isYearsZoomLevel) {
      const yearDuration = 365 * 24 * 60 * 60 * 1000;
      const yearsCount = Math.ceil(
        (timelineEndTime - timelineStartTime) / yearDuration
      );
      const totalWidth = yearsCount * 500;

      const position =
        ((clampedStart - timelineStartTime) /
          (timelineEndTime - timelineStartTime)) *
        totalWidth;
      const width =
        ((clampedEnd - clampedStart) / (timelineEndTime - timelineStartTime)) *
        totalWidth;

      return { position, width };
    }

    const timelineDuration = timelineEndTime - timelineStartTime;
    const position =
      ((clampedStart - timelineStartTime) / timelineDuration) *
      totalTimelineWidth;
    const width =
      ((clampedEnd - clampedStart) / timelineDuration) * totalTimelineWidth;

    return { position, width };
  };

  const calculateProportionalWidth = (
    taskStart: string,
    taskEnd: string,
    cellStart: string,
    cellEnd: string,
    totalWidth: number
  ): { position: number; width: number } => {
    const cellStartTime = new Date(cellStart).getTime();
    const cellEndTime = new Date(cellEnd).getTime();
    const taskStartTime = Math.max(
      new Date(taskStart).getTime(),
      cellStartTime
    );
    const taskEndTime = Math.min(new Date(taskEnd).getTime(), cellEndTime);

    const taskDuration = Math.max(taskEndTime - taskStartTime, 0);
    const cellDuration = cellEndTime - cellStartTime;

    const width = (taskDuration / cellDuration) * totalWidth;
    const position =
      ((taskStartTime - cellStartTime) / cellDuration) * totalWidth;

    return { position, width };
  };

  const calculateCellWidth = (
    cellStart: string,
    cellEnd: string,
    totalTimelineWidth: number,
    totalDuration: number
  ) => {
    const cellDuration =
      new Date(cellEnd).getTime() - new Date(cellStart).getTime();
    return (cellDuration / totalDuration) * totalTimelineWidth;
  };

  const renderDateRow = () => {
    const startYear = minDate.getFullYear();
    const endYear = maxDate.getFullYear();
    const startMonth = minDate.getMonth();
    const endMonth = maxDate.getMonth();
    const cellWidth = Math.max(timelineWidth / dateRange.length, 100);

    const totalDuration = maxDate.getTime() - minDate.getTime();
    const cellWidths = dateRange.map((_, idx) =>
      calculateCellWidth(
        dateRange[idx],
        dateRange[idx + 1] || maxDate.toISOString().split("T")[0],
        timelineWidth,
        totalDuration
      )
    );
    const ensureMinimumCells = (columns: React.ReactNode[]) => {
      while (columns.length < 14) {
        columns.push(
          <Th
            key={`placeholder-${columns.length}`}
            textAlign="center"
            borderColor="gray.200"
            borderRightWidth="1px"
            minWidth={`${cellWidth}px`}
          ></Th>
        );
      }
      return columns;
    };

    if (zoomLevel === "days") {
      const columns = dateRange.map((date, idx) => (
        <Th
          key={idx}
          textAlign="center"
          borderColor="gray.200"
          borderRightWidth="1px"
          minWidth={`${cellWidth}px`}
        >
          {new Date(date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
          })}
        </Th>
      ));
      return <Tr>{ensureMinimumCells(columns)}</Tr>;
    } else if (zoomLevel === "weeks") {
      return (
        <Tr>
          {dateRange.map((date, idx) => (
            <Th
              key={idx}
              textAlign="center"
              borderColor="gray.200"
              borderRightWidth="1px"
              minWidth={`${cellWidth}px`}
            >
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
              })}
            </Th>
          ))}
        </Tr>
      );
    } else if (zoomLevel === "months") {
      return (
        <>
          <Tr>
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year) => (
              <Th
                key={year}
                textAlign="center"
                colSpan={
                  year === startYear
                    ? 12 - startMonth
                    : year === endYear
                    ? endMonth + 1
                    : 12
                }
                borderColor="gray.200"
                borderRightWidth="1px"
                minWidth={`${cellWidth}px`}
              >
                {year}
              </Th>
            ))}
          </Tr>
          <Tr>
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year, yearIdx) =>
              Array.from(
                {
                  length:
                    year === startYear
                      ? 12 - startMonth
                      : year === endYear
                      ? endMonth + 1
                      : 12,
                },
                (_, monthIndex) => (
                  <Th
                    key={`${year}-${monthIndex}`}
                    textAlign="center"
                    borderColor="gray.200"
                    borderRightWidth="1px"
                    minWidth={`${cellWidth}px`}
                  >
                    {new Date(
                      year,
                      (yearIdx === 0 ? startMonth : 0) + monthIndex
                    ).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </Th>
                )
              )
            )}
          </Tr>
        </>
      );
    } else if (zoomLevel === "quarters") {
      return (
        <>
          <Tr>
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year) => (
              <Th
                key={year}
                textAlign="center"
                colSpan={
                  year === startYear
                    ? 4 - Math.floor(startMonth / 3)
                    : year === endYear
                    ? Math.ceil((endMonth + 1) / 3)
                    : 4
                }
                borderColor="gray.200"
                borderRightWidth="1px"
                minWidth={`${cellWidth}px`}
              >
                {year}
              </Th>
            ))}
          </Tr>
          <Tr>
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year) =>
              Array.from(
                {
                  length:
                    year === startYear
                      ? 4 - Math.floor(startMonth / 3)
                      : year === endYear
                      ? Math.ceil((endMonth + 1) / 3)
                      : 4,
                },
                (_, quarterIndex) => (
                  <Th
                    key={`${year}-${quarterIndex}`}
                    textAlign="center"
                    borderColor="gray.200"
                    borderRightWidth="1px"
                    fontSize={"10px"}
                    minWidth={`${cellWidth}px`}
                  >
                    {
                      ["Jan-mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"][
                        (year === startYear ? Math.floor(startMonth / 3) : 0) +
                          quarterIndex
                      ]
                    }
                  </Th>
                )
              )
            )}
          </Tr>
        </>
      );
    } else if (zoomLevel === "years") {
      return (
        <>
          <Tr>
            <Th
              textAlign="center"
              colSpan={endYear - startYear + 1}
              borderColor="gray.200"
              borderRightWidth="1px"
              minWidth="500px"
            >
              {`${startYear} - ${endYear}`}
            </Th>
          </Tr>
          <Tr>
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year) => (
              <Th
                key={year}
                textAlign="center"
                borderColor="gray.200"
                borderRightWidth="1px"
                minWidth="500px"
              >
                {year}
              </Th>
            ))}
          </Tr>
        </>
      );
    }

    return null;
  };

  const DraggableOrStatic: React.FC<{
    isEditMode: boolean;
    children: React.ReactNode;
    onStop?: (e: DraggableEvent, data: DraggableData) => void;
  }> = ({ isEditMode, children, onStop }) => {
    if (isEditMode) {
      return (
        <Draggable axis="x" onStop={onStop}>
          {children}
        </Draggable>
      );
    }
    return <>{children}</>;
  };

  useEffect(() => {
    if (selectedConnection) {
      console.log("Selected connection:", selectedConnection);
    } else {
      console.log("No connection selected.");
    }
  }, [selectedConnection]);


  const updateConnections = (taskId: string, type: "start" | "end", x: number, y: number) => {
    setConnections((prevConnections) =>
      prevConnections.map((connection) => {
        if (type === "start" && connection.fromId === taskId) {
          return { ...connection, startX: x, startY: y };
        }
        if (type === "end" && connection.toId === taskId) {
          return { ...connection, endX: x, endY: y };
        }
        return connection;
      })
    );
  };
  


  return (
    <Box
      ref={timelineRef}
      width={width}
      pt={1.5}
      overflowY="auto"
      height="100vh"
      position="relative"
    >
      {tooltipData && (
        <Box
          position="absolute"
          top={`${tooltipData.y}px`}
          left={`${tooltipData.x}px`}
          transform="translate(-50%, -100%)"
          bg="white"
          p={3}
          borderRadius="md"
          boxShadow="lg"
          zIndex={10}
          onClick={closeTooltip}
        >
          {tooltipData.content}
        </Box>
      )}

      <Flex
        align="center"
        mb={2}
        style={{
          position: "relative", // Ensure stacking context
          zIndex: 2, // Set higher than the SVG
        }}
      >
        <Text fontSize="xl" fontWeight="bold" mx={4}>
          Timeline
        </Text>
        <Flex align="center">
          <Text mr={2}>Zoom:</Text>
          <Select
            width="120px"
            value={zoomLevel}
            onChange={(e) => onZoomChange(e.target.value)}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="quarters">Quarters</option>
            <option value="years">Years</option>
          </Select>
        </Flex>
        <Button
          size="sm"
          ml={4}
          minWidth={"100px"}
          onClick={toggleEditMode}
          colorScheme={isEditMode ? "red" : "blue"}
        >
          {isEditMode ? "Disable Edit" : "Enable Edit"}
        </Button>

        <Flex align="center">
          <Text fontWeight={"bold"} minWidth={"60px"} fontSize={"sm"} mx={4}>Set Role:</Text>
          <Select
          fontSize={"sm"}
            width="180px"
          >
            <option value="user">ARC BIM Modellers</option>
            <option value="weeks">ARC Design Consultant</option>
            <option value="months">ARC Design Coordinator</option>
            <option value="quarters">Landscape Coordinator</option>
            <option value="years">MEP BIM Modellers</option>
            <option value="years">Portal Developer</option>
          </Select>
        </Flex>
        
      </Flex>


      <svg
        pointerEvents="none" 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1, // Lower than the buttons
          width: "100%",
          height: "100%",
        }}
        onMouseMove={handleMouseMove}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
            pointerEvents="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="orange" />
          </marker>
        </defs>

        {renderConnections()}
        {renderTemporaryLine()}
      </svg>

      {/* Modal for showing connection details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connection Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedConnection && (
              <>
                <Text mb={4}>
                  <strong>From:</strong> {selectedConnection.fromTaskName}
                  <br />
                  <strong>To:</strong> {selectedConnection.toTaskName}
                </Text>
                {/* <Text mb={4}>
            <strong>Lead/Lag:</strong> 0
          </Text> */}
                <Flex justify="space-between">
                  <Box display="flex" gap={4}>
                    <Button colorScheme="blue" onClick={handleSaveConnection}>
                      Save
                    </Button>
                    <Button colorScheme="red" onClick={handleDeleteConnection}>
                      Delete
                    </Button>
                  </Box>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </Flex>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Table border="1px" borderColor="gray.200" variant="simple">
        <Thead>{renderDateRow()}</Thead>
        <Tbody>
          {tasks.map((task) => {
            const { position: plannedPosition, width: plannedWidth } =
              zoomLevel === "years"
                ? calculateBarPositionAndWidth(
                    task.plannedStart,
                    task.plannedEnd,
                    minDate.toISOString(),
                    maxDate.toISOString(),
                    timelineWidth,
                    dateRange,
                    true
                  )
                : calculateBarPositionAndWidth(
                    task.plannedStart,
                    task.plannedEnd,
                    minDate.toISOString(),
                    maxDate.toISOString(),
                    timelineWidth,
                    dateRange
                  );

            const { position: actualPosition, width: actualWidth } =
              zoomLevel === "years"
                ? calculateBarPositionAndWidth(
                    task.actualStart,
                    task.actualEnd,
                    minDate.toISOString(),
                    maxDate.toISOString(),
                    timelineWidth,
                    dateRange,
                    true
                  )
                : calculateBarPositionAndWidth(
                    task.actualStart,
                    task.actualEnd,
                    minDate.toISOString(),
                    maxDate.toISOString(),
                    timelineWidth,
                    dateRange
                  );

            const calculateDateDifference = (
              date1: string | Date,
              date2: string | Date
            ): number => {
              const d1 = new Date(date1);
              const d2 = new Date(date2);
              const timeDifference = d1.getTime() - d2.getTime(); // Use getTime() for time in ms
              return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Difference in days
            };

            const renderSubtasks = (subtasks: Task[], level = 1) => {
              return subtasks.map((subtask) => {
                const { position: subPlannedPosition, width: subPlannedWidth } =
                  calculateBarPositionAndWidth(
                    subtask.plannedStart,
                    subtask.plannedEnd,
                    minDate.toISOString(),
                    maxDate.toISOString(),
                    dateRange.length * 100,
                    dateRange
                  );

                const { position: subActualPosition, width: subActualWidth } =
                  calculateBarPositionAndWidth(
                    subtask.actualStart,
                    subtask.actualEnd,
                    minDate.toISOString(),
                    maxDate.toISOString(),
                    dateRange.length * 100,
                    dateRange
                  );

                return (
                  <React.Fragment key={subtask.id}>
                    <Tr
                      bg={selectedTaskId === subtask.id ? "blue.100" : "white"}
                    >
                      <Td
                        colSpan={dateRange.length}
                        position="relative"
                        height="60px"
                        paddingLeft={`${level * 20}px`}
                      >
                        <Box
                          position="absolute"
                          top="50%"
                          left={`${subPlannedPosition + 5}px`}
                          transform="translateY(-50%)"
                          width={`${subPlannedWidth}px`}
                          bg="purple.400"
                          height="14px"
                          cursor={"pointer"}
                          borderRadius="sm"
                          onClick={(e) =>
                            handleSubtaskBarClick(e, subtask, "planned")
                          }
                        >
                          <Progress
                            position="absolute"
                            top="0"
                            w="100%"
                            h="14px"
                            value={subtask.progress}
                            bg="purple.400"
                            sx={{
                              bg: "purple.400",
                              "& > div": {
                                backgroundColor: "purple.600",
                                borderRadius: "sm",
                              },
                            }}
                            borderRadius="sm"
                          />
                          <Text
                            position="absolute"
                            top="10%"
                            left="50%"
                            transform="translateX(-50%) translateY(-20%)"
                            color="white"
                            fontWeight="bold"
                            fontSize="xs"
                          >
                            {subtask.name}
                          </Text>
                        </Box>
                        <DraggableOrStatic
                          isEditMode={isEditMode}
                          
                          onStop={(e, data) => {
                            handleDragStop(subtask, data.x);
                          }}
                        >
                          <Box
                            position="absolute"
                            top={isEditMode ? "70%" : "80%"}
                            left={`${subActualPosition + 5}px`}
                            transform="translateY(-50%)"
                            width={`${subActualWidth}px`}
                            bg="yellow.400"
                            height="14px"
                            borderRadius="sm"
                            cursor={"pointer"}
                            onClick={(e) =>
                              handleSubtaskBarClick(e, subtask, "actual")
                            }
                          >
                            {(() => {
                              const aheadByDays = calculateDateDifference(
                                subtask.plannedStart,
                                subtask.actualStart
                              );
                              const overdueByDays = calculateDateDifference(
                                subtask.actualEnd,
                                subtask.plannedEnd
                              );

                              // Show "Ahead by X days" if the actual start is earlier than planned start
                              if (
                                aheadByDays > 0 &&
                                new Date(subtask.actualStart) <
                                  new Date(subtask.plannedStart)
                              ) {
                                return (
                                  <Text
                                    position="absolute"
                                    left="-15px"
                                    top="50%"
                                    transform="translate(-100%, -50%)"
                                    fontSize="xs"
                                    color="blue.600"
                                    fontWeight="bold"
                                  >
                                    Ahead by {aheadByDays} day
                                    {aheadByDays > 1 ? "s" : ""}
                                  </Text>
                                );
                              }

                              if (
                                overdueByDays > 0 &&
                                new Date(subtask.actualEnd) >
                                  new Date(subtask.plannedEnd)
                              ) {
                                return (
                                  <Text
                                    position="absolute"
                                    right="-15px"
                                    top="50%"
                                    transform="translate(100%, -50%)"
                                    fontSize="xs"
                                    color="red.600"
                                    fontWeight="bold"
                                  >
                                    Overdue by {overdueByDays} day
                                    {overdueByDays > 1 ? "s" : ""}
                                  </Text>
                                );
                              }

                              return null; // No status if neither ahead nor overdue
                            })()}
                            {isEditMode && (
                              <svg
                                width="20"
                                height="20"
                                style={{
                                  position: "absolute",
                                  left: "-7px",
                                  top: "50%",
                                  transform: "translate(-50%, -50%)",
                                  cursor: "pointer",
                                }}
                              >
                                <circle
                                  id={`${subtask.id}-start`}
                                  cx="10"
                                  cy="10"
                                  r="5"
                                  stroke="gray"
                                  fill="white"
                                  onMouseDown={(e) =>
                                    handleCircleDragStart(
                                      e,
                                      subtask.id,
                                      "start"
                                    )
                                  }
                                  onMouseUp={(e) =>
                                    handleCircleDragEnd(e, subtask.id)
                                  }
                                />
                              </svg>
                            )}
                            {isEditMode && (
                              <svg
                                width="20"
                                height="20"
                                style={{
                                  position: "absolute",
                                  right: "-10px",
                                  top: "50%",
                                  transform: "translate(50%, -50%)",
                                  cursor: "pointer",
                                }}
                              >
                                <circle
                                  id={`${subtask.id}-end`}
                                  cx="7"
                                  cy="10"
                                  r="5"
                                  stroke="gray"
                                  fill="white"
                                  onMouseDown={(e) =>
                                    handleCircleDragStart(e, subtask.id, "end")
                                  }
                                  onMouseUp={(e) =>
                                    handleCircleDragEnd(e, subtask.id)
                                  }
                                />
                              </svg>
                            )}
                            <Progress
                              position="absolute"
                              top="0"
                              w="100%"
                              h="14px"
                              value={subtask.progress}
                              bg="yellow.400"
                              sx={{
                                bg: "yellow.400",
                                "& > div": {
                                  backgroundColor: "yellow.500",
                                  borderRadius: "sm",
                                },
                              }}
                              borderRadius="sm"
                            />
                            <Text
                              position="absolute"
                              top="10%"
                              left="50%"
                              transform="translateX(-50%) translateY(-20%)"
                              color="white"
                              fontWeight="bold"
                              fontSize="xs"
                            >
                              {subtask.name}
                            </Text>
                          </Box>
                        </DraggableOrStatic>
                      </Td>
                    </Tr>
                    {/* Recursive call if subtask has subtasks and is expanded */}
                    {expandedTaskIds.has(subtask.id) &&
                      subtask.subtasks &&
                      renderSubtasks(subtask.subtasks, level + 1)}
                  </React.Fragment>
                );
              });
            };

            return (
              <React.Fragment key={task.id}>
                <Tr bg={selectedTaskId === task.id ? "blue.100" : "white"}>
                  <Td
                    colSpan={dateRange.length}
                    position="relative"
                    height="60px"
                    borderColor={"gray.200"}
                    borderRightWidth="1px"
                  >
                    <Box
                      position="absolute"
                      top="50%"
                      cursor={"pointer"}
                      left={`${plannedPosition + 15}px`}
                      transform="translateY(-50%)"
                      width={`${plannedWidth}px`}
                      height="14px"
                      borderRadius="sm"
                      onClick={(e) => handleBarClick(e, task, "planned")}
                    >
                      <Progress
                        position="absolute"
                        top="0"
                        w="100%"
                        h="14px"
                        value={task.progress}
                        bg="blue.400"
                        borderRadius="sm"
                      />
                      <Text
                        position="absolute"
                        top="10%"
                        left="50%"
                        transform="translateX(-50%) translateY(-20%)"
                        color="white"
                        fontWeight="bold"
                        fontSize="xs"
                      >
                        {task.name}
                      </Text>
                    </Box>
                    <DraggableOrStatic
                      isEditMode={isEditMode}
                      onStop={(e, data) => handleDragStop(task, data.x)}
                      
                    >
                      <Box
                        position="absolute"
                        top={isEditMode ? "70%" : "80%"}
                        cursor="pointer"
                        left={`${actualPosition + 15}px`}
                        transform="translateY(-50%)"
                        width={`${actualWidth}px`}
                        bg="green.400"
                        height="14px"
                        borderRadius="sm"
                        onClick={(e) => handleBarClick(e, task, "actual")}
                      >
                        {(() => {
                          const aheadByDays = calculateDateDifference(
                            task.plannedStart,
                            task.actualStart
                          );
                          const overdueByDays = calculateDateDifference(
                            task.actualEnd,
                            task.plannedEnd
                          );

                          // Show "Ahead by X days" if the actual start is earlier than planned start
                          if (
                            aheadByDays > 0 &&
                            new Date(task.actualStart) <
                              new Date(task.plannedStart)
                          ) {
                            return (
                              <Text
                                position="absolute"
                                left="-15px"
                                top="50%"
                                transform="translate(-100%, -50%)"
                                fontSize="xs"
                                color="blue.600"
                                fontWeight="bold"
                              >
                                Ahead by {aheadByDays} day
                                {aheadByDays > 1 ? "s" : ""}
                              </Text>
                            );
                          }

                          if (
                            overdueByDays > 0 &&
                            new Date(task.actualEnd) > new Date(task.plannedEnd)
                          ) {
                            return (
                              <Text
                                position="absolute"
                                right="-15px"
                                top="50%"
                                transform="translate(100%, -50%)"
                                fontSize="xs"
                                color="red.600"
                                fontWeight="bold"
                              >
                                Overdue by {overdueByDays} day
                                {overdueByDays > 1 ? "s" : ""}
                              </Text>
                            );
                          }

                          return null; // No status if neither ahead nor overdue
                        })()}

                        {isEditMode && (
                          <svg
                            width="20"
                            height="20"
                            style={{
                              position: "absolute",
                              left: "-7px",
                              top: "50%",
                              transform: "translate(-50%, -50%)",
                              cursor: "pointer",
                            }}
                          >
                            <circle
                              id={`${task.id}-start`}
                              cx="10"
                              cy="10"
                              r="5"
                              stroke="gray"
                              fill="white"
                              onMouseDown={(e) =>
                                handleCircleDragStart(e, task.id, "start")
                              }
                          
                              onMouseUp={(e) => handleCircleDragEnd(e, task.id)}
    
                            />
                          </svg>
                        )}
                        {isEditMode && (
                          <svg
                            width="20"
                            height="20"
                            style={{
                              position: "absolute",
                              right: "-10px",
                              top: "50%",
                              transform: "translate(50%, -50%)",
                              cursor: "pointer",
                            }}
                          >
                            <circle
                              id={`${task.id}-end`}
                              cx="7"
                              cy="10"
                              r="5"
                              stroke="gray"
                              fill="white"
                              onMouseDown={(e) =>
                                handleCircleDragStart(e, task.id, "end")
                              }
                           
                              onMouseUp={(e) => handleCircleDragEnd(e, task.id)}
                           
                            />
                          </svg>
                        )}
                        <Progress
                          position="absolute"
                          top="0"
                          w="100%"
                          h="14px"
                          value={task.progress}
                          bg="green.400"
                          sx={{
                            bg: "green.400",
                            "& > div": {
                              backgroundColor: "green.600",
                              borderRadius: "sm",
                            },
                          }}
                          borderRadius="sm"
                        />
                        <Text
                          position="absolute"
                          top="10%"
                          left="50%"
                          transform="translateX(-50%) translateY(-20%)"
                          color="white"
                          fontWeight="bold"
                          fontSize="xs"
                        >
                          {task.name}
                        </Text>
                      </Box>
                    </DraggableOrStatic>
                  </Td>
                </Tr>

                {expandedTaskIds.has(task.id) &&
                  task.subtasks &&
                  renderSubtasks(task.subtasks)}
              </React.Fragment>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
const App: React.FC = () => {
  const [panelWidth, setPanelWidth] = useState("35%");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState<string>("days");
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [task, setTask] = useState<Task[]>([]);

  const [expandedTaskIds, setExpandedTaskIds] = useState<Set<string>>(
    new Set()
  );

  const toggleExpandedTask = (taskId: string) => {
    setExpandedTaskIds((prevExpandedTaskIds) => {
      const newExpandedTaskIds = new Set(prevExpandedTaskIds);
      if (newExpandedTaskIds.has(taskId)) {
        newExpandedTaskIds.delete(taskId); // Collapse the task
      } else {
        newExpandedTaskIds.add(taskId); // Expand the task
      }
      return newExpandedTaskIds;
    });
  };

  // const fetchTasks = async () => {
  //   try {
  //     const tasksCollection = collection(db, "tasks");
  //     const taskDocs = await getDocs(tasksCollection);
  //     const fetchedTasks: Task[] = taskDocs.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     })) as Task[];
  //     setTask(fetchedTasks);
  //   } catch (error) {
  //     console.error("Error fetching tasks: ", error);
  //     alert("Failed to fetch tasks. Please try again.");
  //   }
  // };

  // useEffect(() => {
  //   fetchTasks();
  // }, [task]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const newWidth =
        Math.min(Math.max(event.clientX - 20, 150), window.innerWidth - 200) +
        "px";
      setPanelWidth(newWidth);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <TaskContext.Provider value={{ expandedTaskIds, toggleExpandedTask }}>
      <Flex style={{ height: "100vh" }}>
        <TaskListPanel
          tasks={task}
          setTask={setTask}
          width={panelWidth}
          selectedTaskId={selectedTaskId}
          onSelectTask={setSelectedTaskId}
          zoomLevel={zoomLevel}
          expandedTaskId={expandedTaskId}
          setExpandedTaskId={setExpandedTaskId}
        />
        <Box
          width="5px"
          bg="gray.300"
          cursor="col-resize"
          onMouseDown={handleMouseDown}
        />
        <TimelinePanel
          width={`calc(100% - ${panelWidth})`}
          selectedTaskId={selectedTaskId}
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
          expandedTaskId={expandedTaskId}
          tasks={task}
          setTask={setTask}
        />
      </Flex>
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export default App;
