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
} from "@chakra-ui/react";

interface Task {
  id: string;
  name: string;
  plannedStart: string;
  plannedEnd: string;
  actualStart: string;
  actualEnd: string;
  duration: string;
  dependency: string;
  risk: string;
  progress: number;
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
  });

  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (newTask.plannedStart && newTask.plannedEnd) {
      const startDate = new Date(newTask.plannedStart);
      const endDate = new Date(newTask.plannedEnd);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      setNewTask((prev) => ({
        ...prev,
        duration: daysDiff,
      }));
    }
  }, [newTask.plannedStart, newTask.plannedEnd]);

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

  const handleRiskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTask((prev) => ({
      ...prev,
      risk: e.target.value,
    }));
  };

  const handleProgressChange = (value: number) => {
    setNewTask((prev) => ({
      ...prev,
      progress: value,
    }));
  };

  return (
    <Box width={width} p={2} overflowY="auto" height="100vh">
      <Flex>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Task Details
        </Text>
        <Button onClick={handleAddTaskClick}>Add Task</Button>
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="taskName" isRequired>
              <FormLabel>Task Name</FormLabel>
              <Input
                value={newTask.name}
                onChange={handleInputChange}
                name="name"
                placeholder="Enter task name"
              />
            </FormControl>

            <FormControl id="plannedStart" isRequired>
              <FormLabel>Planned Start</FormLabel>
              <Input
                type="date"
                value={newTask.plannedStart}
                onChange={handleInputChange}
                name="plannedStart"
              />
            </FormControl>

            <FormControl id="plannedEnd" isRequired>
              <FormLabel>Planned End</FormLabel>
              <Input
                type="date"
                value={newTask.plannedEnd}
                onChange={handleInputChange}
                name="plannedEnd"
              />
            </FormControl>

            <FormControl id="actualStart" isRequired>
              <FormLabel>Actual Start</FormLabel>
              <Input
                type="date"
                value={newTask.actualStart}
                onChange={handleInputChange}
                name="actualStart"
              />
            </FormControl>

            <FormControl id="actualEnd" isRequired>
              <FormLabel>Actual End</FormLabel>
              <Input
                type="date"
                value={newTask.actualEnd}
                onChange={handleInputChange}
                name="actualEnd"
              />
            </FormControl>

            <FormControl id="duration" isRequired>
              <FormLabel>Duration (in days)</FormLabel>
              <Input
                type="number"
                value={newTask.duration}
                onChange={handleInputChange}
                name="duration"
                isReadOnly
                disabled
              />
            </FormControl>

            <FormControl id="dependency" isRequired>
              <FormLabel>Dependency</FormLabel>
              <Input
                value={newTask.dependency}
                onChange={handleInputChange}
                name="dependency"
                placeholder="Dependency task"
              />
            </FormControl>

            <FormControl id="risk" isRequired>
              <FormLabel>Risk Level</FormLabel>
              <Select
                value={newTask.risk}
                onChange={handleRiskChange}
                name="risk"
            
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FormControl>

            <FormControl id="progress" mt={4}>
              <FormLabel>Progress</FormLabel>
              <Box position="relative" onMouseMove={handleSliderMouseMove}>
                <Slider
                  value={newTask.progress}
                  onChange={handleProgressChange}
                  min={0}
                  max={100}
                  step={1}
                  aria-label="Progress slider"
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
                  borderRadius="50px"
                  padding="4px"
                  py={2}
                  textAlign={"center"}
                  fontSize="10px"
                  opacity={newTask.progress === 0 ? 0 : 1}
                >
                  {Math.round(newTask.progress)}%
                </Box>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                console.log("New Task Data:", newTask);
                handleCloseModal();
              }}
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
    return Array.from(new Set(dateRange.map((date) => new Date(date).getFullYear())));
  };

  const getMonthName = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "short" });
  };

  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { day: "2-digit", month: "short" });
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
                      <Progress
                        position="absolute"
                        top="20%"
                        h="12px"
                        left={1}
                        w={`${plannedEndIdx - plannedStartIdx + 1}00%`}
                        bg="blue.400"
                        borderRadius="md"
                      />
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
        width="2px"
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
