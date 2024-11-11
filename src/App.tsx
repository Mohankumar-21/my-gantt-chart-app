import React, { useState, useEffect, useRef } from "react";
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
  progress: number;
  role?: string;
  stage?: string;
}

const tasks: Task[] = [
  {
    id: "1",
    name: "Task 1",
    plannedStart: "2024-11-01",
    plannedEnd: "2024-11-10",
    actualStart: "2024-11-02",
    actualEnd: "2024-11-08",
    duration: "5 days",
    dependency: "None",
    risk: "Low",
    progress: 20,
  },
  {
    id: "2",
    name: "Task 2",
    plannedStart: "2024-11-02",
    plannedEnd: "2024-11-08",
    actualStart: "2024-11-03",
    actualEnd: "2024-11-07",
    duration: "6 days",
    dependency: "None",
    risk: "Medium",
    progress: 50,
  },
  {
    id: "3",
    name: "Task 3",
    plannedStart: "2024-11-01",
    plannedEnd: "2024-11-05",
    actualStart: "2024-11-02",
    actualEnd: "2024-11-04",
    duration: "4 days",
    dependency: "Task 1",
    risk: "High",
    progress: 80,
  },
];

const generateDateRange = (
  startDate: string,
  endDate: string,
  zoomLevel: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];

  switch (zoomLevel) {
    case "days":
      for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        dates.push(dt.toISOString().split("T")[0]);
      }
      break;
    case "weeks":
      for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 7)) {
        dates.push(dt.toISOString().split("T")[0]);
      }
      break;
    case "months":
      for (let dt = start; dt <= end; dt.setMonth(dt.getMonth() + 1)) {
        dates.push(dt.toISOString().split("T")[0]);
      }
      break;
    case "quarters":
      for (let dt = start; dt <= end; dt.setMonth(dt.getMonth() + 3)) {
        dates.push(dt.toISOString().split("T")[0]);
      }
      break;
    case "years":
      for (let dt = start; dt <= end; dt.setFullYear(dt.getFullYear() + 1)) {
        dates.push(dt.toISOString().split("T")[0]);
      }
      break;
    default:
      break;
  }
  return dates;
};

const TaskListPanel: React.FC<{
  width: string;
  selectedTaskId: string;
  onSelectTask: (id: string) => void;
}> = ({ selectedTaskId, onSelectTask, width }) => {
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
    role: "Coordinator",
    stage: "DR-1",
    actualDuration: 0,
  });

  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  // Update plannedEnd based on plannedStart and duration
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
              minWidth={"150px"}
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
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task) => (
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
              >
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
            </Tr>
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

                {/* Planned End */}
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
                <option value="Low">Coordinator</option>
                <option value="Medium">Manager</option>
                <option value="High">User</option>
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
                <option value="Low">DR-1</option>
                <option value="Medium">DR-2</option>
                <option value="High">DR-3</option>
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
  onZoomChange: (level: string) => void;
}> = ({ zoomLevel, onZoomChange, width, selectedTaskId }) => {
  const startDates = tasks.map((task) => new Date(task.plannedStart).getTime());
  const endDates = tasks.map((task) => new Date(task.plannedEnd).getTime());

  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));

  const dateRange = generateDateRange(
    minDate.toISOString().split("T")[0],
    maxDate.toISOString().split("T")[0],
    zoomLevel
  );

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

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options);
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
        <Thead>
          <Tr>
            {dateRange.map((date) => (
              <Th
                borderColor={"gray.200"}
                borderRightWidth="1px"
                minWidth={"100px"}
                key={date}
                textAlign="center"
              >
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task) => {
            const plannedStartIdx = dateRange.indexOf(task.plannedStart);
            const plannedEndIdx = dateRange.indexOf(task.plannedEnd);
            const actualStartIdx = dateRange.indexOf(task.actualStart);
            const actualEndIdx = dateRange.indexOf(task.actualEnd);

            return (
              <Tr
                key={task.id}
                bg={selectedTaskId === task.id ? "blue.100" : "white"}
              >
                {dateRange.map((date, idx) => (
                  <Td
                    borderColor={"gray.200"}
                    borderRightWidth="1px"
                    height={"52px"}
                    key={date}
                    position="relative"
                  >
                    {idx === plannedStartIdx && (
                      <Tooltip
                        label={
                          <Box p={2} bg="white" borderRadius="md" shadow="md">
                            <Text fontWeight="bold" mb={1}>
                              {task.name}
                            </Text>
                            <Text>
                              <strong>Duration:</strong> {task.duration} days
                            </Text>
                            <Text>
                              <strong>Stage:</strong> {task.stage}
                            </Text>
                            <Text>
                              <strong>Planned Start:</strong>{" "}
                              {task.plannedStart}
                            </Text>
                            <Text>
                              <strong>Planned End:</strong> {task.plannedEnd}
                            </Text>
                            <Text>
                              <strong>Status:</strong>{" "}
                              {task.progress === 100
                                ? "Completed"
                                : "In Progress"}
                            </Text>
                            <Text>
                              <strong>Progress:</strong> {task.progress}%
                            </Text>
                          </Box>
                        }
                        aria-label="Task Details"
                        placement="top"
                        hasArrow
                        openDelay={0}
                        closeDelay={0}
                      >
                        <Progress
                          position="absolute"
                          top="20%"
                          h="12px"
                          cursor={"pointer"}
                          left={1}
                          w={`${plannedEndIdx - plannedStartIdx + 1}00%`}
                          bg="blue.400"
                          borderRadius="md"
                        />
                      </Tooltip>
                    )}
                    {idx === actualStartIdx && (
                      <Progress
                        position="absolute"
                        top="50%"
                        h="12px"
                        left={1}
                        w={`${actualEndIdx - actualStartIdx + 1}00%`}
                        bg="green.300"
                        borderRadius="md"
                      />
                    )}
                  </Td>
                ))}
              </Tr>
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const newWidth = `${event.clientX - 20}px`;
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
      />
    </Flex>
  );
};

export default App;
