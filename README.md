This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



<!-- 
import React, { useState, useEffect } from "react";
import {
  Box,
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

const TaskTable: React.FC = () => {
  const [dateColumns, setDateColumns] = useState<string[]>([]);
  const [panelWidth, setPanelWidth] = useState<number>(1000); // example numeric initial value
  const [isDragging, setIsDragging] = useState(false);
  const [leftColumnWidth, setLeftColumnWidth] = useState(600); // Initial width for left columns
  const [rightColumnWidth, setRightColumnWidth] = useState(100); // Initial width for right date columns

  useEffect(() => {
    const startDate = new Date("2024-11-01");
    const endDate = new Date("2024-11-07");
    const dates = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(d.toISOString().split("T")[0]);
    }

    setDateColumns(dates);
  }, []);

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
        const newWidth = Math.max(event.clientX - 20, 200); // Adjust width calculation

        setLeftColumnWidth(newWidth); // Update left column width

        // Use panelWidth directly since it's already a number
        const panelWidthNum = panelWidth; // No need to convert from string

        // Ensure right column width is updated based on new left column width
        setRightColumnWidth(panelWidthNum - newWidth);
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
    <Flex flexDirection="column">
      <Table.Root colorScheme="gray" border="1px solid" borderColor="gray.300" borderRadius="md">
        <TableHeader>
          <TableRow>
            <TableColumnHeader minWidth="100px" p={2} py={5} width={`${leftColumnWidth}px`}>
              Task Name
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5} width={`${leftColumnWidth}px`}>
              Planned Start
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5} width={`${leftColumnWidth}px`}>
              Planned End
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5} width={`${leftColumnWidth}px`}>
              Actual Start
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5} width={`${leftColumnWidth}px`}>
              Actual End
            </TableColumnHeader>
            <TableColumnHeader minWidth="100px" p={2} py={5} width={`${leftColumnWidth}px`}>
              Duration
            </TableColumnHeader>
            <TableColumnHeader minWidth="120px" p={2} py={5} width={`${leftColumnWidth}px`}>
              Dependency
            </TableColumnHeader>
            <TableColumnHeader minWidth="100px" p={2} py={5} width={`${leftColumnWidth}px`}>
              Risk
            </TableColumnHeader>
            <TableColumnHeader minWidth="100px" p={2} py={5} width={`${leftColumnWidth}px`}>
              Progress
            </TableColumnHeader>
            <Box
              width="2px"
              height="30px"
              cursor="col-resize"
              onMouseDown={handleMouseDown}
              backgroundColor="gray.400"
              borderRadius="md"
            />
            {dateColumns.map((date) => (
              <TableColumnHeader key={date} minWidth="80px" p={2} py={5} width={`${rightColumnWidth / dateColumns.length}px`}>
                {date}
              </TableColumnHeader>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} borderBottom="1px solid" borderColor="gray.300">
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
              {/* Placeholder for dynamic date cells */}
              {dateColumns.map((date, index) => (
                <TableCell key={index} p={2} py={4}>
                  {/* Logic to display status or date-related information */}
                  {task.progress >= 100 ? "Done" : "In Progress"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </Flex>
  );
};

const App: React.FC = () => {
  return (
    <Flex>
      <TaskTable />
    </Flex>
  );
};

export default App; -->

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
  const minDate = new Date(
    Math.min(...tasks.map((task) => new Date(task.plannedStart).getTime()))
  );
  const maxDate = new Date(
    Math.max(...tasks.map((task) => new Date(task.plannedEnd).getTime()))
  );

  const handleProgressChange = (value: number, taskId: string) => {
    setTask((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, inlineProgress: value } : task
      )
    );
  };

  const handleDragStop = (taskId: string, offsetX: number) => {
    const daysMoved = Math.round(offsetX / 100);
    setTask((prevTasks) =>
      prevTasks.map((task) => {
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
      })
    );
  };

  const calculateBarWidth = (
    taskStart: string,
    taskEnd: string,
    cellStart: string,
    cellEnd: string,
    cellWidth: number
  ): string => {
    const taskStartTime = Math.max(new Date(taskStart).getTime(), new Date(cellStart).getTime());
    const taskEndTime = Math.min(new Date(taskEnd).getTime(), new Date(cellEnd).getTime());
    const taskDuration = Math.max(taskEndTime - taskStartTime, 0);
    const cellDuration = new Date(cellEnd).getTime() - new Date(cellStart).getTime();
    return `${(taskDuration / cellDuration) * cellWidth}px`;
  };

  const generateDateRange = (minDate: Date, maxDate: Date, zoomLevel: string) => {
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
  const renderDateRow = () => {
    const startYear = minDate.getFullYear();
    const endYear = maxDate.getFullYear();
  
    if (zoomLevel === "days") {
      return (
        <Tr>
          {dateRange.map((date, idx) => (
            <Th
              key={idx}
              textAlign="center"
              borderColor="gray.200"
              borderRightWidth="1px"
              minWidth="100px"
            >
              {new Date(date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}
            </Th>
          ))}
        </Tr>
      );
    } else if (zoomLevel === "weeks") {
      return (
        <Tr>
          {dateRange.map((date, idx) => (
            <Th
              key={idx}
              textAlign="center"
              borderColor="gray.200"
              borderRightWidth="1px"
              minWidth="100px"
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
            {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
              (year) => (
                <Th
                  key={year}
                  textAlign="center"
                  colSpan={12}
                  borderColor="gray.200"
                  borderRightWidth="1px"
                >
                  {year}
                </Th>
              )
            )}
          </Tr>
          <Tr>
            {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
              (year) =>
                Array.from({ length: 12 }, (_, monthIndex) => (
                  <Th
                    key={`${year}-${monthIndex}`}
                    textAlign="center"
                    borderColor="gray.200"
                    borderRightWidth="1px"
                    minWidth="100px"
                  >
                    {new Date(year, monthIndex).toLocaleDateString("en-US", {
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
          <Tr>
            {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
              (year) => (
                <Th
                  key={year}
                  textAlign="center"
                  colSpan={4}
                  borderColor="gray.200"
                  borderRightWidth="1px"
                >
                  {year}
                </Th>
              )
            )}
          </Tr>
          <Tr>
            {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
              (year) =>
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
        <Tr>
          {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
            (year) => (
              <Th
                key={year}
                textAlign="center"
                borderColor="gray.200"
                borderRightWidth="1px"
                minWidth="100px"
              >
                {year}
              </Th>
            )
          )}
        </Tr>
      );
    }
  
    return null;
  };
  ;

  return (
    <Box width={width} p={4} overflowY="auto" height="100vh">
      <Flex align="center" mb={2}>
        <Text fontSize="xl" fontWeight="bold" mr={4}>
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
      <Table border="1px" borderColor="gray.200" variant="simple">
        <Thead>{renderDateRow()}</Thead>
        <Tbody>
          {tasks.map((task) => (
            <Tr key={task.id}>
              {dateRange.map((date, idx) => (
                <Td key={idx} minWidth="100px" position="relative">
                  <Box
                  cursor={"pointer"}
                    position="absolute"
                    left="0"
                    width={calculateBarWidth(
                      task.plannedStart,
                      task.plannedEnd,
                      dateRange[idx],
                      dateRange[idx + 1] || maxDate.toISOString().split("T")[0],
                      100
                    )}
                    bg="blue.400"
                    height="14px"
                  />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
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


  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
  };



const renderDateRow = () => {
  const startYear = minDate.getFullYear();
  const endYear = maxDate.getFullYear();

  if (zoomLevel === "days") {
    return (
      <Tr>
        {dateRange.map((date, idx) => (
          <Th
            key={idx}
            textAlign="center"
            borderColor="gray.200"
            borderRightWidth="1px"
            minWidth="100px"
          >
            {new Date(date).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
            })}
          </Th>
        ))}
      </Tr>
    );
  } else if (zoomLevel === "weeks") {
    return (
      <Tr>
        {dateRange.map((date, idx) => (
          <Th
            key={idx}
            textAlign="center"
            borderColor="gray.200"
            borderRightWidth="1px"
            minWidth="100px"
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
          {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
            (year) => (
              <Th
                key={year}
                textAlign="center"
                colSpan={12}
                borderColor="gray.200"
                borderRightWidth="1px"
              >
                {year}
              </Th>
            )
          )}
        </Tr>
        <Tr>
          {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
            (year) =>
              Array.from({ length: 12 }, (_, monthIndex) => (
                <Th
                  key={`${year}-${monthIndex}`}
                  textAlign="center"
                  borderColor="gray.200"
                  borderRightWidth="1px"
                  minWidth="100px"
                >
                  {new Date(year, monthIndex).toLocaleDateString("en-US", {
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
        <Tr>
          {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
            (year) => (
              <Th
                key={year}
                textAlign="center"
                colSpan={4}
                borderColor="gray.200"
                borderRightWidth="1px"
              >
                {year}
              </Th>
            )
          )}
        </Tr>
        <Tr>
          {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
            (year) =>
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
      <Tr>
        {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(
          (year) => (
            <Th
              key={year}
              textAlign="center"
              borderColor="gray.200"
              borderRightWidth="1px"
              minWidth="100px"
            >
              {year}
            </Th>
          )
        )}
      </Tr>
    );
  }

  return null;
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
                          key={task.id}
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




<!-- 
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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineWidth, setTimelineWidth] = useState(0);

  
  useEffect(() => {
    if (timelineRef.current) {
      const calculatedWidth = Math.max(
        timelineRef.current.offsetWidth,
        100 * dateRange.length
      );
      setTimelineWidth(calculatedWidth);
    }
  }, [width, zoomLevel]);

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

  const handleDragStop = (taskId: string, offsetX: number) => {
const daysMoved =
  (offsetX / timelineWidth) *
  (maxDate.getTime() - minDate.getTime()) /
  (1000 * 60 * 60 * 24);

    setTask((prevTasks) =>
      prevTasks.map((task) => {
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
      })
    );
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
    totalTimelineWidth: number
  ) => {
    const timelineStartTime = new Date(timelineStart).getTime();
    const timelineEndTime = new Date(timelineEnd).getTime();
    const taskStartTime = new Date(taskStart).getTime();
    const taskEndTime = new Date(taskEnd).getTime();

    const clampedStart = Math.max(taskStartTime, timelineStartTime);
    const clampedEnd = Math.min(taskEndTime, timelineEndTime);

    const position =
      ((clampedStart - timelineStartTime) / (timelineEndTime - timelineStartTime)) *
      totalTimelineWidth;
    const width =
      ((clampedEnd - clampedStart) / (timelineEndTime - timelineStartTime)) *
      totalTimelineWidth;

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
    const taskStartTime = Math.max(new Date(taskStart).getTime(), cellStartTime);
    const taskEndTime = Math.min(new Date(taskEnd).getTime(), cellEndTime);
  
    const taskDuration = Math.max(taskEndTime - taskStartTime, 0);
    const cellDuration = cellEndTime - cellStartTime;
  
    const width = (taskDuration / cellDuration) * totalWidth;
    const position = ((taskStartTime - cellStartTime) / cellDuration) * totalWidth;
  
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

    const totalDuration =
    maxDate.getTime() - minDate.getTime(); // Total duration in milliseconds
  const cellWidths = dateRange.map((_, idx) =>
    calculateCellWidth(
      dateRange[idx],
      dateRange[idx + 1] || maxDate.toISOString().split("T")[0],
      timelineWidth,
      totalDuration
    )
  ); 

   
    if (zoomLevel === "days") {
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
                day: "2-digit",
                month: "short",
              })}
            </Th>
          ))}
        </Tr>
      );
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
              minWidth={`${cellWidth}px`}
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
                minWidth={`${cellWidth}px`}
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


  return (
    <Box
    ref={timelineRef}
      width={width}
      pt={1.5}
      overflowY="auto"
      height="100vh"
    >
      <Flex align="center" mb={2}>
        <Text fontSize="xl" fontWeight="bold" mr={4}>
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
      <Table border="1px" borderColor="gray.200" variant="simple">
        <Thead>{renderDateRow()}</Thead>
        <Tbody>
          {tasks.map((task) => {
      const { position: plannedPosition, width: plannedWidth } =
      calculateBarPositionAndWidth(
        task.plannedStart,
        task.plannedEnd,
        minDate.toISOString(),
        maxDate.toISOString(),
        timelineWidth
      );

    const { position: actualPosition, width: actualWidth } =
      calculateBarPositionAndWidth(
        task.actualStart,
        task.actualEnd,
        minDate.toISOString(),
        maxDate.toISOString(),
        timelineWidth
      );

            return (
              <React.Fragment key={task.id}>
                <Tr  bg={selectedTaskId === task.id ? "blue.100" : "white"}>
                  <Td
                    colSpan={dateRange.length}
                    position="relative"
                    height="60px"
                  >
                    <Box
                      position="absolute"
                      top="50%"
                      cursor={"pointer"}
                      left={`${plannedPosition}px`}
                      transform="translateY(-50%)"
                      width={`${plannedWidth}px`}
                      height="14px"
                      borderRadius="md"
                    >
                      <Progress
                        position="absolute"
                        top="0"
                        w="100%"
                        h="14px"
                        value={task.inlineProgress}
                        bg="blue.400"
                        borderRadius="md"
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
                    {/* Actual Bar */}
                    <Box
                      position="absolute"
                      top="80%"
                      cursor={"pointer"}
                      left={`${actualPosition}px`}
                      transform="translateY(-50%)"
                      width={`${actualWidth}px`}
                      bg="green.400"
                      height="14px"
                      borderRadius="md"
                    >
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
                  </Td>
                </Tr>
                {expandedTaskId === task.id &&
                  task.subtasks?.map((subtask) => {
                    const {
                      position: subPlannedPosition,
                      width: subPlannedWidth,
                    } = calculateBarPositionAndWidth(
                      subtask.plannedStart,
                      subtask.plannedEnd,
                      minDate.toISOString(),
                      maxDate.toISOString(),
                      dateRange.length * 100
                    );

                    const {
                      position: subActualPosition,
                      width: subActualWidth,
                    } = calculateBarPositionAndWidth(
                      subtask.actualStart,
                      subtask.actualEnd,
                      minDate.toISOString(),
                      maxDate.toISOString(),
                      dateRange.length * 100
                    );

                    return (
                      <Tr key={subtask.id} bg="gray.50">
                        <Td
                          colSpan={dateRange.length}
                          position="relative"
                          height="60px"
                        >
                          {/* Subtask Planned Bar */}
                          <Box
                            position="absolute"
                            top="50%"
                            left={`${subPlannedPosition}px`}
                            transform="translateY(-50%)"
                            width={`${subPlannedWidth}px`}
                            bg="purple.400"
                            height="14px"
                            borderRadius="md"
                          />

                          <Box
                            position="absolute"
                            top="80%"
                            left={`${subActualPosition}px`}
                            transform="translateY(-50%)"
                            width={`${subActualWidth}px`}
                            bg="yellow.400"
                            height="14px"
                            borderRadius="md"
                          />
                        </Td>
                      </Tr>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}; -->



// first set after new timeline


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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineWidth, setTimelineWidth] = useState(0);

  
  useEffect(() => {
    if (timelineRef.current) {
      setTimelineWidth(timelineRef.current.offsetWidth);
    }
  }, [width]);

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

  const handleDragStop = (taskId: string, offsetX: number) => {
const daysMoved =
  (offsetX / timelineWidth) *
  (maxDate.getTime() - minDate.getTime()) /
  (1000 * 60 * 60 * 24);

    setTask((prevTasks) =>
      prevTasks.map((task) => {
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
      })
    );
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
    totalTimelineWidth: number
  ) => {
    const timelineStartTime = new Date(timelineStart).getTime();
    const timelineEndTime = new Date(timelineEnd).getTime();
    const taskStartTime = new Date(taskStart).getTime();
    const taskEndTime = new Date(taskEnd).getTime();

    const clampedStart = Math.max(taskStartTime, timelineStartTime);
    const clampedEnd = Math.min(taskEndTime, timelineEndTime);

    const position =
      ((clampedStart - timelineStartTime) / (timelineEndTime - timelineStartTime)) *
      totalTimelineWidth;
    const width =
      ((clampedEnd - clampedStart) / (timelineEndTime - timelineStartTime)) *
      totalTimelineWidth;

    return { position, width };
  };
  
  const renderDateRow = () => {
    const startYear = minDate.getFullYear();
    const endYear = maxDate.getFullYear();
    const startMonth = minDate.getMonth();
    const endMonth = maxDate.getMonth();

    if (zoomLevel === "days") {
      return (
        <Tr>
          {dateRange.map((date, idx) => (
            <Th
              key={idx}
              textAlign="center"
              borderColor="gray.200"
              borderRightWidth="1px"
              minWidth="100px"
            >
              {new Date(date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
              })}
            </Th>
          ))}
        </Tr>
      );
    } else if (zoomLevel === "weeks") {
      return (
        <Tr>
          {dateRange.map((date, idx) => (
            <Th
              key={idx}
              textAlign="center"
              borderColor="gray.200"
              borderRightWidth="1px"
              minWidth="100px"
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
                    minWidth="100px"
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
                    minWidth="100px"
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
              minWidth="100px"
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
                width="100px"
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


  return (
    <Box
      ref={timelineRef}
      width={width}
      pt={1.5}
      overflowY="auto"
      height="100vh"
    >
      <Flex align="center" mb={2}>
        <Text fontSize="xl" fontWeight="bold" mr={4}>
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
      <Table border="1px" borderColor="gray.200" variant="simple">
        <Thead>{renderDateRow()}</Thead>
        <Tbody>
          {tasks.map((task) => {
            const { position: plannedPosition, width: plannedWidth } =
              calculateBarPositionAndWidth(
                task.plannedStart,
                task.plannedEnd,
                minDate.toISOString(),
                maxDate.toISOString(),
                dateRange.length * 100 // Adjusted for total timeline width
              );

            const { position: actualPosition, width: actualWidth } =
              calculateBarPositionAndWidth(
                task.actualStart,
                task.actualEnd,
                minDate.toISOString(),
                maxDate.toISOString(),
                dateRange.length * 100
              );

            return (
              <React.Fragment key={task.id}>
                <Tr bg={selectedTaskId === task.id ? "blue.100" : "white"}>
                  <Td
                    colSpan={dateRange.length}
                    position="relative"
                    height="60px"
                  >
                    <Box
                      position="absolute"
                      top="50%"
                      cursor={"pointer"}
                      left={`${plannedPosition}px`}
                      transform="translateY(-50%)"
                      width={`${plannedWidth}px`}
                      height="14px"
                      borderRadius="md"
                    >
                      <Progress
                        position="absolute"
                        top="0"
                        w="100%"
                        h="14px"
                        value={task.inlineProgress}
                        bg="blue.400"
                        borderRadius="md"
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
                    {/* Actual Bar */}
                    <Box
                      position="absolute"
                      top="80%"
                      cursor={"pointer"}
                      left={`${actualPosition}px`}
                      transform="translateY(-50%)"
                      width={`${actualWidth}px`}
                      bg="green.400"
                      height="14px"
                      borderRadius="md"
                    >
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
                  </Td>
                </Tr>
                {expandedTaskId === task.id &&
                  task.subtasks?.map((subtask) => {
                    const {
                      position: subPlannedPosition,
                      width: subPlannedWidth,
                    } = calculateBarPositionAndWidth(
                      subtask.plannedStart,
                      subtask.plannedEnd,
                      minDate.toISOString(),
                      maxDate.toISOString(),
                      dateRange.length * 100
                    );

                    const {
                      position: subActualPosition,
                      width: subActualWidth,
                    } = calculateBarPositionAndWidth(
                      subtask.actualStart,
                      subtask.actualEnd,
                      minDate.toISOString(),
                      maxDate.toISOString(),
                      dateRange.length * 100
                    );

                    return (
                      <Tr key={subtask.id} bg="gray.50">
                        <Td
                          colSpan={dateRange.length}
                          position="relative"
                          height="60px"
                        >
                          {/* Subtask Planned Bar */}
                          <Box
                            position="absolute"
                            top="50%"
                            left={`${subPlannedPosition}px`}
                            transform="translateY(-50%)"
                            width={`${subPlannedWidth}px`}
                            bg="purple.400"
                            height="14px"
                            borderRadius="md"
                          />

                          <Box
                            position="absolute"
                            top="80%"
                            left={`${subActualPosition}px`}
                            transform="translateY(-50%)"
                            width={`${subActualWidth}px`}
                            bg="yellow.400"
                            height="14px"
                            borderRadius="md"
                          />
                        </Td>
                      </Tr>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};



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


const tasks: Task[] = [
  {
    id: "1",
    name: "Task 1",
    plannedStart: "2024-11-01",
    plannedEnd: "2026-11-10",
    actualStart: "2024-11-02",
    actualEnd: "2025-11-08",
    duration: 5,
    stage: "DR-1",
    dependency: "None",
    risk: "Low",
    inlineProgress: 0,
    type: "project",
    progress: 20,
    dependencies: [{ taskId: "2", type: "FS" }],
    subtasks: [
      {
        id: "1.1",
        name: "Subtask 1.1",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-07",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-06",
        duration: 5,
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
        duration: 5,
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
    plannedEnd: "2025-11-08",
    actualStart: "2024-11-03",
    actualEnd: "2024-12-07",
    duration: 6,
    type: "project",
    stage: "DR-1",
    inlineProgress: 20,
    dependency: "None",
    risk: "Medium",
    progress: 50,
    dependencies: [{ taskId: "2", type: "FS" }],
    subtasks: [
      {
        id: "2.1",
        name: "Subtask 2.1",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-07",
        actualStart: "2024-11-02",
        actualEnd: "2024-11-06",
        duration: 5,
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
        duration: 5,
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
        duration: 5,
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
        duration: 5,
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
    duration: 4,
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
        duration: 5,
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
        duration: 5,
        stage: "DR-1",
        dependency: "None",
        risk: "Low",
        type: "task",
        progress: 20,
      },
    ],
  },
];