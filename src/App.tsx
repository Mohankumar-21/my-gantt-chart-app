import React, { useState, useEffect } from "react";

import {
  Box,
  Text,
  Flex,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumnHeader,
  TableCell,
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
  {
    id: "4",
    name: "Task 3",
    plannedStart: "2024-11-05",
    plannedEnd: "2024-11-10",
    actualStart: "2024-11-05",
    actualEnd: "2024-11-09",
    duration: "4 days",
    dependency: "Task 1",
    risk: "High",
    progress: 80,
  },
];

// Helper function to generate date range
const generateDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];

  for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    dates.push(dt.toISOString().split("T")[0]);
  }

  return dates;
};

const generateDate = (
  StartDate: string,
  EndDate: string,
  zoomLevel: string
) => {
  const start = new Date(StartDate);
  const end = new Date(EndDate);
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
    case "years":
      for (let dt = start; dt <= end; dt.setFullYear(dt.getFullYear() + 1)) {
        dates.push(dt.toISOString().split("T")[0]);
      }
      break;
    case "quarters":
      for (let dt = start; dt <= end; dt.setMonth(dt.getMonth() + 3)) {
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
}> = ({ width, selectedTaskId, onSelectTask }) => {
  return (
    <Box
      width={width}
      pl={4}
      pe={0}
      py={4}
      overflowY="auto"
      height="100vh"
      overflowX={"auto"}
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Task Details
      </Text>
      <Table.Root
        border={"1px solid"}
        borderColor={"gray.200"}
        colorScheme="gray"
      >
        <TableHeader>
          <TableRow>
            <TableColumnHeader
              textAlign={"center"}
              borderRight={"1px solid"}
              borderColor={"gray.200"}
              minWidth="100px"
              p={2}
              py={5}
            >
              Task Name
            </TableColumnHeader>
            <TableColumnHeader
              minWidth="120px"
              p={2}
              py={5}
              borderRight={"1px solid"}
              borderColor={"gray.200"}
              textAlign={"center"}
            >
              Planned Start
            </TableColumnHeader>
            <TableColumnHeader
              minWidth="120px"
              p={2}
              py={5}
              borderRight={"1px solid"}
              borderColor={"gray.200"}
              textAlign={"center"}
            >
              Planned End
            </TableColumnHeader>
            <TableColumnHeader
              minWidth="120px"
              p={2}
              py={5}
              borderRight={"1px solid"}
              borderColor={"gray.200"}
              textAlign={"center"}
            >
              Actual Start
            </TableColumnHeader>
            <TableColumnHeader
              minWidth="120px"
              p={2}
              py={5}
              borderRight={"1px solid"}
              borderColor={"gray.200"}
              textAlign={"center"}
            >
              Actual End
            </TableColumnHeader>
            <TableColumnHeader
              minWidth="100px"
              p={2}
              py={5}
              borderRight={"1px solid"}
              borderColor={"gray.200"}
              textAlign={"center"}
            >
              Duration
            </TableColumnHeader>
            <TableColumnHeader
              minWidth="120px"
              p={2}
              py={5}
              borderRight={"1px solid"}
              borderColor={"gray.200"}
              textAlign={"center"}
            >
              Dependency
            </TableColumnHeader>
            <TableColumnHeader
              minWidth="100px"
              p={2}
              py={5}
              borderRight={"1px solid"}
              borderColor={"gray.200"}
              textAlign={"center"}
            >
              Risk
            </TableColumnHeader>
            <TableColumnHeader
              minWidth="100px"
              p={2}
              py={5}
              borderRight={"1px solid"}
              borderColor={"gray.200"}
              textAlign={"center"}
            >
              Progress
            </TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              borderBottom="1px solid"
              borderColor="gray.300"
              _hover={{ backgroundColor: "gray.200", cursor: "pointer" }}
              bg={selectedTaskId === task.id ? "blue.100" : "white"}
              onClick={() => onSelectTask(task.id)}
            >
              <TableCell p={2} py={4} textAlign={"center"}>
                {task.name}
              </TableCell>
              <TableCell p={2} py={4} textAlign={"center"}>
                {task.plannedStart}
              </TableCell>
              <TableCell p={2} py={4} textAlign={"center"}>
                {task.plannedEnd}
              </TableCell>
              <TableCell p={2} py={4} textAlign={"center"}>
                {task.actualStart}
              </TableCell>
              <TableCell p={2} py={4} textAlign={"center"}>
                {task.actualEnd}
              </TableCell>
              <TableCell p={2} py={4} textAlign={"center"}>
                {task.duration}
              </TableCell>
              <TableCell p={2} py={4} textAlign={"center"}>
                {task.dependency}
              </TableCell>
              <TableCell p={2} py={4} textAlign={"center"}>
                {task.risk}
              </TableCell>
              <TableCell p={2} py={4} textAlign={"center"}>
                <Box width="100%">
                  <Box
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </Box>
  );
};

const TimelinePanel: React.FC<{
  width: string;
  selectedTaskId: string;
  zoomLevel: string;
  onZoomChange: (level: string) => void;
}> = ({ width, selectedTaskId, zoomLevel, onZoomChange }) => {
  const startDates = tasks.map((task) => new Date(task.plannedStart).getTime());
  const endDates = tasks.map((task) => new Date(task.plannedEnd).getTime());

  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));

  const dateRange = generateDate(
    minDate.toISOString().split("T")[0],
    maxDate.toISOString().split("T")[0],
    zoomLevel
  );
  const years = Array.from(
    new Set(dateRange.map((date) => new Date(date).getFullYear()))
  );
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Box width={width} pl={0} pe={4} py={5} overflowY="auto" height="100vh">
      <Flex gap={5} align={"center"} pl={5}>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Timeline
        </Text>
        <Flex mb={3}>
          <Text>Zoom : </Text>
          <select
            className="px-5"
            value={zoomLevel}
            onChange={(e) => onZoomChange(e.target.value)}
          >
            <option value="days" className="px-5">
              Days
            </option>
            <option value="quarters">Quarters</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </Flex>
      </Flex>
      <Table.Root
        border={"1px solid"}
        borderColor={"gray.200"}
        colorScheme="gray"
      >
        <TableHeader>
          <TableRow>
            {dateRange.map((date) => (
              <TableColumnHeader
                borderRight={"1px solid"}
                borderColor={"gray.200"}
                textAlign={"center"}
                key={date}
                minWidth="80px"
                p={2}
                py={5}
              >
                <TableRow>
                  <Text>{formatDate(new Date(date))}</Text>
                </TableRow>
              </TableColumnHeader>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            const plannedStartIdx = dateRange.findIndex(
              (date) => date === task.plannedStart
            );
            const plannedEndIdx = dateRange.findIndex(
              (date) => date === task.plannedEnd
            );

            const actualStartIdx = dateRange.findIndex(
              (date) => date === task.actualStart
            );
            const actualEndIdx = dateRange.findIndex(
              (date) => date === task.actualEnd
            );
            const plannedWidth = plannedEndIdx - plannedStartIdx + 1;
            const actualWidth = actualEndIdx - actualStartIdx + 1;
            return (
              <TableRow
                key={task.id}
                bg={selectedTaskId === task.id ? "blue.100" : "white"}
              >
                {dateRange.map((date, idx) => (
                  <TableCell
                    borderRight={"1px solid"}
                    borderColor={"gray.200"}
                    textAlign={"center"}
                    key={date}
                    p={0}
                    py={6}
                    pb={7}
                    position="relative"
                  >
                    {/* Planned Bar */}
                    {idx === plannedStartIdx && (
                      <Box
                        position="absolute"
                        top="35%"
                        left="2"
                        p={2}
                        transform="translateY(-50%)"
                        height="15px"
                        width={`${plannedWidth * 100}%`}
                        backgroundColor="blue.400"
                        borderRadius="md"
                        cursor="pointer"
                      />
                    )}
                    {/* Actual Bar */}
                    {idx === actualStartIdx && (
                      <Box
                        position="absolute"
                        top="65%"
                        left="2"
                        p={2}
                        transform="translateY(-50%)"
                        height="15px"
                        width={`${actualWidth * 100}%`}
                        backgroundColor="green.300"
                        borderRadius="md"
                        cursor="pointer"
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table.Root>
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
      const newWidth = `${event.clientX}px`;
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
    <Flex height="100vh">
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
