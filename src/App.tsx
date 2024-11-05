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
    plannedEnd: "2024-11-07",
    actualStart: "2024-11-02",
    actualEnd: "2024-11-06",
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
      borderRight="1px solid"
      borderColor="gray.200"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Task Details
      </Text>
      <Table.Root colorScheme="gray">
        <TableHeader>
          <TableRow>
            <TableColumnHeader minWidth="100px" p={2} py={5}>
              Task Name
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5}>
              Planned Start
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5}>
              Planned End
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5}>
              Actual Start
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5}>
              Actual End
            </TableColumnHeader>
            <TableColumnHeader minWidth="100px" p={2} py={5}>
              Duration
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5}>
              Dependency
            </TableColumnHeader>
            <TableColumnHeader minWidth="100px" p={2} py={5}>
              Risk
            </TableColumnHeader>
            <TableColumnHeader minWidth="100px" p={2} py={5}>
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
              bg={selectedTaskId === task.id ? "blue.100" : "white"} // Highlight selected task
              onClick={() => onSelectTask(task.id)} // Handle row click
            >
              <TableCell p={2} py={4}>
                {task.name}
              </TableCell>
              <TableCell p={2} py={4}>
                {task.plannedStart}
              </TableCell>
              <TableCell p={2} py={4}>
                {task.plannedEnd}
              </TableCell>
              <TableCell p={2} py={4}>
                {task.actualStart}
              </TableCell>
              <TableCell p={2} py={4}>
                {task.actualEnd}
              </TableCell>
              <TableCell p={2} py={4}>
                {task.duration}
              </TableCell>
              <TableCell p={2} py={4}>
                {task.dependency}
              </TableCell>
              <TableCell p={2} py={4}>
                {task.risk}
              </TableCell>
              <TableCell p={2} py={4}>
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

const TimelinePanel: React.FC<{ width: string; selectedTaskId: string }> = ({
  width,
  selectedTaskId,
}) => {
  const startDates = tasks.map((task) => new Date(task.plannedStart).getTime());
  const endDates = tasks.map((task) => new Date(task.plannedEnd).getTime());

  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));

  const dateRange = generateDateRange(
    minDate.toISOString().split("T")[0],
    maxDate.toISOString().split("T")[0]
  );
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <Box width={width} pl={0} pe={4} py={4} overflowY="auto" height="100vh">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Timeline
      </Text>
      <Table.Root colorScheme="gray">
        <TableHeader>
          <TableRow>
            {dateRange.map((date) => (
              <TableColumnHeader key={date} minWidth="100px" p={2} py={5}>
                {formatDate(new Date(date))}
              </TableColumnHeader>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => {
            const startIdx = dateRange.findIndex(
              (date) => date === task.plannedStart
            );
            const endIdx = dateRange.findIndex(
              (date) => date === task.plannedEnd
            );
            return (
              <TableRow
                key={task.id}
                bg={selectedTaskId === task.id ? "blue.100" : "white"}
              >
                {" "}
                {/* Highlight corresponding timeline */}
                {dateRange.map((date, idx) => (
                  <TableCell key={date} p={2} py={5}>
                    {idx >= startIdx && idx <= endIdx ? (
                      <Box
                        height="12px"
                        width="100%"
                        backgroundColor="blue.200"
                      />
                    ) : null}
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
      />
    
    </Flex>
  );
};

export default App;
