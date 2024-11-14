import React, { useState, useEffect, useRef } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { IoMdArrowDropup } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
} from "@chakra-ui/react";

interface Task {
  id: string;
  name: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart: string;
  actualEnd: string;
  duration: string;
  actualDuration?: string;
  dependency: string;
  risk: string;
  inlineProgress?: number;
  progress: number;
  role?: string;
  type: string;
  stage?: string;
  subtasks?: Task[];
}

const tasks: Task[] = [
  {
    id: "1",
    name: "Task 1",
    plannedStart: "2024-11-01",
    plannedEnd: "2027-11-10",
    actualStart: "2024-11-02",
    actualEnd: "2024-11-08",
    duration: "5 days",
    stage: "DR-1",
    dependency: "None",
    risk: "Low",
    inlineProgress: 0,
    type: "project",
    progress: 20,
    subtasks: [
      {
        id: "1.1",
        name: "Subtask 1.1",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-07",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-06",
        duration: "5 days",
        stage: "DR-1",
        dependency: "None",
        risk: "Low",
        type: "task",
        progress: 20,
      },
      {
        id: "1.2",
        name: "Subtask 1.2",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-07",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-06",
        duration: "5 days",
        stage: "DR-1",
        dependency: "None",
        risk: "Low",
        type: "task",
        progress: 20,
      },
    ],
  },
  {
    id: "2",
    name: "Task 2",
    plannedStart: "2024-11-02",
    plannedEnd: "2024-11-08",
    actualStart: "2024-11-03",
    actualEnd: "2024-11-07",
    duration: "6 days",
    type: "project",
    stage: "DR-1",
    inlineProgress: 20,
    dependency: "None",
    risk: "Medium",
    progress: 50,
    subtasks: [
      {
        id: "2.1",
        name: "Subtask 2.1",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-07",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-06",
        duration: "5 days",
        stage: "DR-1",
        dependency: "None",
        risk: "Low",
        type: "task",
        progress: 20,
      },
      {
        id: "2.2",
        name: "Subtask 2.2",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-05",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-03",
        duration: "5 days",
        stage: "DR-1",
        dependency: "None",
        risk: "Low",
        type: "task",
        progress: 20,
      },
      {
        id: "2.3",
        name: "Subtask 2.3",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-07",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-06",
        duration: "5 days",
        stage: "DR-1",
        dependency: "None",
        risk: "Low",
        type: "task",
        progress: 20,
      },
      {
        id: "2.4",
        name: "Subtask 2.4",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-07",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-06",
        duration: "5 days",
        stage: "DR-1",
        dependency: "None",
        risk: "Low",
        type: "task",
        progress: 20,
      },
    ],
  },
  {
    id: "3",
    name: "Task 3",
    plannedStart: "2024-11-01",
    plannedEnd: "2024-11-05",
    actualStart: "2024-11-02",
    actualEnd: "2024-11-04",
    type: "project",
    duration: "4 days",
    dependency: "Task 1",
    risk: "High",
    inlineProgress: 10,
    stage: "DR-1",
    progress: 80,
    subtasks: [
      {
        id: "3.1",
        name: "Subtask 3.1",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-07",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-06",
        duration: "5 days",
        stage: "DR-1",
        dependency: "None",
        risk: "Low",
        type: "task",
        progress: 20,
      },
      {
        id: "3.2",
        name: "Subtask 3.2",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-07",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-06",
        duration: "5 days",
        stage: "DR-1",
        dependency: "None",
        risk: "Low",
        type: "task",
        progress: 20,
      },
    ],
  },
];

const generateDateRange = (
  startDate: string,
  endDate: string,
  zoomLevel: string
): string[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];

  // Create a clone of the start date
  let currentDate = new Date(start);

  switch (zoomLevel) {
    case "days":
      while (currentDate <= end) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      break;

    case "weeks":
      while (currentDate <= end) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 7);
      }
      break;

    case "months":
      while (currentDate <= end) {
        dates.push(currentDate.toISOString().split("T")[0]);
        const day = currentDate.getDate();
        currentDate.setMonth(currentDate.getMonth() + 1);

        // Ensure the day doesn't overflow to the next month
        if (currentDate.getDate() < day) {
          currentDate.setDate(0); // Adjust to the last valid day of the month
        }
      }
      break;

    case "quarters":
      while (currentDate <= end) {
        dates.push(currentDate.toISOString().split("T")[0]);
        const day = currentDate.getDate();
        currentDate.setMonth(currentDate.getMonth() + 3);

        // Ensure the day doesn't overflow to the next quarter
        if (currentDate.getDate() < day) {
          currentDate.setDate(0);
        }
      }
      break;

    case "years":
      while (currentDate <= end) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setFullYear(currentDate.getFullYear() + 1);
      }
      break;

    default:
      console.error("Unsupported zoom level:", zoomLevel);
      break;
  }

  return dates;
};


const TaskListPanel: React.FC<{
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
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
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
    actualDuration: 0,
    subtasks: [],
  });

  const toggleSubtasks = (taskId: string) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
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
  }, [newTask.actualStart, newTask.actualDuration]);

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDurationChange = (change: number) => {
    setNewTask((prev) => {
      const newDuration = prev.duration + change;
      return {
        ...prev,
        duration: Math.max(newDuration, 0),
      };
    });
  };

  const handleActualDurationChange = (change: number) => {
    setNewTask((prev) => {
      const newDuration = prev.actualDuration + change;
      return {
        ...prev,
        actualDuration: Math.max(newDuration, 0),
      };
    });
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

  return (
    <Box width={width} p={2} overflowY="auto" height="100vh">
      <Flex gap={5}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Task Details
        </Text>
        <Button
          onClick={handleAddTaskClick}
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
              minWidth={"150px"}
              height={`${
                zoomLevel === "weeks"
                  ? "59px"
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
                onClick={handleAddTaskClick}
                icon={faPlus}
                size="lg"
              />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task) => (
            <>
              <Tr
                fontSize="sm"
                key={task.id}
                bg={selectedTaskId === task.id ? "blue.100" : "white"}
                onClick={() => onSelectTask(task.id)}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
              >
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                  height={"60px"}
                >
                  {task.id}
                </Td>

                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                  height={"60px"}
                >
                  {task.type === "task" ? `${task.stage}` : ""}
                </Td>
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                  height={"60px"}
                  onClick={() => toggleSubtasks(task.id)}
                  cursor="pointer"
                  display="flex"
                  alignItems={"center"}
                >
                  <FontAwesomeIcon
                    color="orange"
                    icon={expandedTaskId === task.id ? faFolderOpen : faFolder}
                    style={{ marginRight: "8px" }}
                  />
                  {task.name}
                </Td>
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                >
                  {task.plannedStart}
                </Td>
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                >
                  {task.plannedEnd}
                </Td>
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                >
                  {task.actualStart}
                </Td>
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                >
                  {task.actualEnd}
                </Td>
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                >
                  {task.duration}
                </Td>
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                >
                  {task.dependency}
                </Td>
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                >
                  {task.risk}
                </Td>
                <Td
                  borderColor={"gray.200"}
                  borderRightWidth="1px"
                  textAlign="center"
                >
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
                    onClick={handleAddTaskClick}
                    size="sm"
                  />
                </Td>
              </Tr>
              {expandedTaskId === task.id &&
                task.subtasks &&
                task.subtasks.map((subtask) => (
                  <Tr
                    key={subtask.id}
                    fontSize="sm"
                    bg={selectedTaskId === task.id ? "white" : "white"}
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                  >
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                      height={"60px"}
                    >
                      {subtask.id}
                    </Td>

                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                      height={"60px"}
                    >
                      {subtask.type === "task" ? `${subtask.stage}` : ""}
                    </Td>
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                      height={"60px"}
                      display={"flex"}
                      alignItems={"center"}
                      marginLeft={"10px"}
                    >
                      <FontAwesomeIcon
                        color="blue"
                        icon={faFileAlt}
                        style={{ marginRight: "8px" }}
                      />
                      {subtask.name}
                    </Td>
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                    >
                      {subtask.plannedStart}
                    </Td>
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                    >
                      {subtask.plannedEnd}
                    </Td>
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                    >
                      {subtask.actualStart}
                    </Td>
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                    >
                      {subtask.actualEnd}
                    </Td>
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                    >
                      {subtask.duration}
                    </Td>
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                    >
                      {subtask.dependency}
                    </Td>
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                    >
                      {subtask.risk}
                    </Td>
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      textAlign="center"
                    >
                      <Box width="100%">
                        <Progress
                          height="5px"
                          width={`${subtask.progress}%`}
                          backgroundColor={
                            subtask.progress < 30
                              ? "red.400"
                              : subtask.progress < 70
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
                    ></Td>
                  </Tr>
                ))}
            </>
          ))}
        </Tbody>
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
                    <Text mx={3} fontSize="sm" fontWeight="semibold">
                      {newTask.duration} days
                    </Text>
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
                    <Text mx={3} fontSize="sm" fontWeight="semibold">
                      {newTask.actualDuration} days
                    </Text>
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

          <ModalFooter>
            <Button variant="ghost" onClick={handleCloseModal} fontSize="sm">
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => {
                console.log("New Task Data:", newTask);
                handleCloseModal();
              }}
              fontSize="md"
            >
              Save Task
            </Button>
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
  task: Task[];
  setTask: React.Dispatch<React.SetStateAction<Task[]>>;

  onZoomChange: (level: string) => void;
}> = ({
  zoomLevel,
  onZoomChange,
  width,
  selectedTaskId,
  expandedTaskId,
  task,
  setTask,
}) => {
  const startDates = tasks.map((task) => new Date(task.plannedStart).getTime());
  const endDates = tasks.map((task) => new Date(task.plannedEnd).getTime());

  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));


  const handleProgressChange = (value: number, taskId: string) => {
    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, inlineProgress: value } : task
      )
    );
  };


 

  const dateRange = generateDateRange(
    minDate.toISOString().split("T")[0],
    maxDate.toISOString().split("T")[0],
    zoomLevel
  );

  const handleDragStop = (taskId: string, offsetX: number) => {
    const daysMoved = Math.round(offsetX / 120);

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const newStartDate = new Date(
          new Date(task.actualStart).getTime() + daysMoved * 86400000
        );
        const newEndDate = new Date(
          new Date(task.actualEnd).getTime() + daysMoved * 86400000
        );
        return {
          ...task,
          actualStart: newStartDate.toISOString(),
          actualEnd: newEndDate.toISOString(),
        };
      }
      return task;
    });
  };

  const getYearRow = () => {
    return Array.from(
      new Set(dateRange.map((date) => new Date(date).getFullYear()))
    );
  };

  const getMonthName = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "short" });
  };

  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
  };



  const renderDateRow = () => {
    const startYear = new Date(minDate).getFullYear();
    const endYear = new Date(maxDate).getFullYear();

    if (zoomLevel === "days") {
      const minDateObj = new Date(minDate);
      const maxDateObj = new Date(maxDate);

      if (isNaN(minDateObj.getTime()) || isNaN(maxDateObj.getTime())) {
        console.error("Invalid date values");
        return null;
      }

      const totalDays = Math.ceil(
        (maxDateObj.getTime() - minDateObj.getTime()) / (1000 * 3600 * 24)
      );
      return (
        <>
          <Tr key="dates">
            {dateRange.map((date, idx) => (
              <Th
                key={idx}
                textAlign="center"
                borderColor="gray.200"
                borderRightWidth="1px"
                minWidth={"120px"}
              >
                {getDate(date)}
              </Th>
            ))}
          </Tr>
        </>
      );
    } else if (zoomLevel === "months") {
      return (
        <>
          <Tr key="year">
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year) => (
              <Th
                key={year}
                textAlign="center"
                colSpan={12}
                borderColor="gray.200"
                borderRightWidth="1px"
              >
                {year}
              </Th>
            ))}
          </Tr>

          <Tr key="months">
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year) =>
              Array.from({ length: 12 }, (_, monthIndex) => (
                <Th
                  key={`${year}-${monthIndex}`}
                  textAlign="center"
                  borderColor="gray.200"
                  borderRightWidth="1px"
                >
                  {new Date(year, monthIndex).toLocaleString("default", {
                    month: "short",
                  })}
                </Th>
              ))
            )}
          </Tr>
        </>
      );
    } else if (zoomLevel === "quarters") {
      return (
        <>
          <Tr key="year">
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year) => (
              <Th
                key={year}
                textAlign="center"
                colSpan={4}
                borderColor="gray.200"
                borderRightWidth="1px"
              >
                {year}
              </Th>
            ))}
          </Tr>

          <Tr key="quarters">
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year) =>
              ["(Jan-Mar)", "(Apr-Jun)", "(Jul-Sep)", "(Oct-Dec)"].map(
                (quarter, idx) => (
                  <Th
                    key={`${year}-${quarter}`}
                    textAlign="center"
                    borderColor="gray.200"
                    borderRightWidth="1px"
                    minWidth="120px"
                  >
                    {quarter}
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
          <Tr key="year">
            <Th
              textAlign="center"
              colSpan={endYear - startYear + 1}
              borderColor="gray.200"
              borderRightWidth="1px"
            >
              {`${startYear} - ${endYear}`}
            </Th>
          </Tr>

          <Tr key="years">
            {Array.from(
              { length: endYear - startYear + 1 },
              (_, i) => startYear + i
            ).map((year) => (
              <Th
                key={year}
                textAlign="center"
                borderColor="gray.200"
                borderRightWidth="1px"
              >
                {year}
              </Th>
            ))}
          </Tr>
        </>
      );
    } else if (zoomLevel === "weeks") {
      const getWeeksInYear = (year: number) => {
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31);
        const weeks = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 7)
        );
        return weeks;
      };

      const weeks = [];
      let currentWeekStart = new Date(minDate);
      while (currentWeekStart <= new Date(maxDate)) {
        let currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
        weeks.push({ start: currentWeekStart, end: currentWeekEnd });
        currentWeekStart = new Date(currentWeekEnd);
      }

      return (
        <>
          <Tr key="weeks">
            {weeks.map((week, idx) => (
              <Th
                key={idx}
                borderColor="gray.200"
                borderRightWidth="1px"
                minWidth={"120px"}
              >
                {getDate(week.start.toISOString())} -{" "}
                {getDate(week.end.toISOString())}
              </Th>
            ))}
          </Tr>
        </>
      );
    }
  };
  const handleDrag = throttle((e: any, data: { x: number }, taskId: string) => {
    const newProgress = Math.min(Math.max(data.x / 120, 0), 1);
    handleProgressChange(newProgress * 100, taskId);
  }, 50);

  const gradientWidth = `${task.map((task) => task.inlineProgress)}%`;
  const gradientStyle = {
    background: `linear-gradient(to right, #4fd1c5 0%, #68d391 ${gradientWidth}%, #edf2f7 ${gradientWidth}%, #edf2f7 100%)`,
  };

  const calculateBarWidth = (
    startIdx: number,
    endIdx: number,
    totalUnits: number
  ): string => {
    const unitWidth = 100 / totalUnits; 
    return `${(endIdx - startIdx + 1) * unitWidth}%`;
  };
  

  return (
    <Box width={width} pe={2} py={2} overflowY="auto" height="100vh">
      <Flex align="center" mb={2}>
        <Text px={2} fontSize="xl" fontWeight="bold" mr={4}>
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
      </Flex>
      <Table
        border={"1px"}
        borderColor={"gray.200"}
        variant="simple"
        colorScheme="gray"
      >
        <Thead>{renderDateRow()}</Thead>
        <Tbody>
          {tasks.map((task) => {
            const plannedStartIdx = dateRange.indexOf(task.plannedStart);
            const plannedEndIdx = dateRange.indexOf(task.plannedEnd);
            const actualStartIdx = dateRange.indexOf(task.actualStart);
            const actualEndIdx = dateRange.indexOf(task.actualEnd);
            const plannedBarWidth = `${
              (plannedEndIdx - plannedStartIdx + 1) * 100
            }%`;
            const actualBarWidth = `${
              (actualEndIdx - actualStartIdx + 1) * 100
            }%`;


            

            return (
              <React.Fragment key={task.id}>
                <Tr bg={selectedTaskId === task.id ? "blue.100" : "white"}>
                  {dateRange.map((date, idx) => (
                    <Td
                      borderColor={"gray.200"}
                      borderRightWidth="1px"
                      height={"60px"}
                      key={date}
                      position="relative"
                    >
                      {idx === plannedStartIdx && (
                        <Tooltip
                          bg={"white"}
                          position={"absolute"}
                          label={
                            <Box p={2} bg="white">
                              <Text fontWeight="bold" mb={1}>
                                {task.name}
                              </Text>
                            </Box>
                          }
                          aria-label="Task Details"
                          placement="top"
                          hasArrow
                          openDelay={0}
                          closeDelay={0}
                        >
                          <Box
                            position="absolute"
                            top="20%"
                            cursor={"pointer"}
                            left={1}
                            width={plannedBarWidth}
                          >
              
                            <Progress
                              position="absolute"
                              top="0"
                              w="100%"
                              h="14px"
                              value={task.inlineProgress}
                              bg="blue.400"
                              borderRadius="md"
                              style={gradientStyle}
                            />
                            <Text
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translateX(-50%) translateY(-20%)"
                              color="white"
                              fontWeight="bold"
                              fontSize="xs"
                            >
                              {task.name}
                            </Text>
                          </Box>
                        </Tooltip>
                      )}
                      {idx === actualStartIdx && (
                        <Draggable
                          axis="x"
                          grid={[120, 0]}
                          onStop={(e, data) => handleDragStop(task.id, data.x)}
                        >
                          <Box
                            position="absolute"
                            top="50%"
                            left={1}
                            width={actualBarWidth}
                            cursor={"pointer"}
                          >
                            <Progress
                              position="absolute"
                              top="0"
                              h="14px"
                              w="100%"
                              bg="green.300"
                              borderRadius="md"
                            />

                            <Text
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translateX(-50%) translateY(-20%)"
                              color="white"
                              fontWeight="bold"
                              fontSize="xs"
                            >
                              {task.name}
                            </Text>
                          </Box>
                        </Draggable>
                      )}
                    </Td>
                  ))}
                </Tr>

                {expandedTaskId === task.id &&
                  task.subtasks?.map((subtask) => (
                    <Tr
                      key={subtask.id}
                      bg={selectedTaskId === task.id ? "white" : "white"}
                    >
                      {dateRange.map((date, idx) => {
                        const plannedsubStartIdx = dateRange.indexOf(
                          subtask.plannedStart
                        );
                        const plannedsubEndIdx = dateRange.indexOf(
                          subtask.plannedEnd
                        );
                        const actualsubStartIdx = dateRange.indexOf(
                          subtask.actualStart
                        );
                        const actualsubEndIdx = dateRange.indexOf(
                          subtask.actualEnd
                        );
                        const plannedsubBarWidth = `${
                          (plannedsubEndIdx - plannedsubStartIdx + 1) * 100
                        }%`;
                        const actualsubBarWidth = `${
                          (actualsubEndIdx - actualsubStartIdx + 1) * 100
                        }%`;

                        return (
                          <Td
                            borderColor={"gray.200"}
                            borderRightWidth="1px"
                            height={"60px"}
                            key={date}
                            position="relative"
                          >
                            {idx === plannedsubStartIdx && (
                              <Tooltip
                                bg={"white"}
                                position={"absolute"}
                                label={
                                  <Box p={2} bg="white">
                                    <Text fontWeight="bold" mb={1}>
                                      {subtask.name}
                                    </Text>
                                  </Box>
                                }
                                aria-label="Task Details"
                                placement="top"
                                hasArrow
                                openDelay={0}
                                closeDelay={0}
                              >
                                <Box
                                  position="absolute"
                                  top="20%"
                                  cursor={"pointer"}
                                  left={1}
                                  width={plannedsubBarWidth}
                                >
                                  <Progress
                                    position="absolute"
                                    top="20%"
                                    h="14px"
                                    cursor={"pointer"}
                                    left={1}
                                    w="100%"
                                    bg="purple.400"
                                    borderRadius="md"
                                  />
                                  <Text
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translateX(-50%) translateY(-20%)"
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="xs"
                                  >
                                    {subtask.name}
                                  </Text>
                                </Box>
                              </Tooltip>
                            )}
                            {idx === actualsubStartIdx && (
                              <Draggable
                                axis="x"
                                grid={[120, 0]}
                                onStop={(e, data) =>
                                  handleDragStop(subtask.id, data.x)
                                }
                              >
                                <Box
                                  position="absolute"
                                  top="50%"
                                  cursor={"pointer"}
                                  left={1}
                                  width={actualsubBarWidth}
                                >
                                  <Progress
                                    position="absolute"
                                    top="50%"
                                    h="14px"
                                    left={1}
                                    cursor={"pointer"}
                                    w="100%"
                                    bg="yellow.400"
                                    borderRadius="md"
                                  />
                                  <Text
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translateX(-50%) translateY(-20%)"
                                    color="white"
                                    fontWeight="bold"
                                    fontSize="xs"
                                  >
                                    {subtask.name}
                                  </Text>
                                </Box>
                              </Draggable>
                            )}
                          </Td>
                        );
                      })}
                    </Tr>
                  ))}
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

  useEffect(() => {
    setTask(tasks);
  }, []);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

const handleMouseMove = (event: MouseEvent) => {
  if (isDragging) {
    const newWidth = Math.min(Math.max(event.clientX - 20, 150), window.innerWidth - 200) + "px"; 
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
    <Flex style={{ height: "100vh" }}>
      <TaskListPanel
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
        task={task}
        setTask={setTask}
      />
    </Flex>
  );
};

export default App;
