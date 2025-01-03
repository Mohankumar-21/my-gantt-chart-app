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
      // If it's a subtask
      const parentTask = tasks.find((t) => t.id === parentTaskId);
      const subtaskToEdit = parentTask?.subtasks?.find(
        (sub) => sub.id === task.id
      );
      if (subtaskToEdit) {
        setNewTask({ ...subtaskToEdit });
        setEditingTaskId(task.id);
      }
    } else {
      // If it's a parent task
      setNewTask({ ...task });
      setEditingTaskId(task.id);
    }
    setIsModalOpen(true);
  };

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
  const handleAddTaskClick = (selectedTaskId?: string) => {
    if (!selectedTaskId) {
      // Add a new parent task
      const newParentId = (tasks.length + 1).toString();
      setNewTask({
        id: newParentId,
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
    } else {
      // Add a subtask to the selected task
      const selectedTask = tasks.find((task) => task.id === selectedTaskId);
      if (selectedTask) {
        const newSubtaskId = `${selectedTask.id}.${
          (selectedTask.subtasks?.length || 0) + 1
        }`;
        setNewTask({
          id: newSubtaskId,
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
          actualDuration: 0,
          status: "Not-started",
          subtasks: [],
        });
      }
    }

    setIsModalOpen(true);
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
      const newDuration = (prev.actualDuration || 0) + change;
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
    if (!newTask.name || !newTask.plannedStart || !newTask.plannedEnd) {
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

    try {
      const tasksCollection = collection(db, "tasks");

      if (newTask.id.includes(".")) {
        // Handle Subtask
        const [parentId] = newTask.id.split(".");
        const parentTaskRef = doc(tasksCollection, parentId);

        // Fetch the parent task
        const parentTaskSnap = await getDoc(parentTaskRef);
        if (!parentTaskSnap.exists()) {
          throw new Error("Parent task not found.");
        }

        const parentTask = parentTaskSnap.data();

        // Update the subtasks array
        const updatedSubtasks = [
          ...(parentTask.subtasks || []),
          { ...newTask },
        ];

        await setDoc(parentTaskRef, {
          ...parentTask,
          subtasks: updatedSubtasks,
        });

        // Update local state
        setTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === parentId ? { ...task, subtasks: updatedSubtasks } : task
          )
        );

        toast({
          title: "Subtask Saved",
          description: `Subtask "${newTask.name}" added to Task ${parentId}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        // Handle Parent Task
        const snapshot = await getDocs(tasksCollection);

        const existingIds = snapshot.docs.map(
          (doc) => parseInt(doc.id, 10) || 0
        );
        const nextId = (Math.max(0, ...existingIds) + 1).toString();

        const taskWithId = { ...newTask, id: nextId };

        const docRef = doc(tasksCollection, nextId);
        await setDoc(docRef, taskWithId);

        // Update local state
        setTask((prevTasks) => [...prevTasks, taskWithId]);

        toast({
          title: "Task Saved",
          description: `Your task "${newTask.name}" has been successfully saved.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
      toast({
        title: "Error",
        description: "Failed to save task. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleUpdateTask = async () => {
    if (!newTask.name || !newTask.plannedStart || !newTask.plannedEnd) {
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
      const isSubtask = editingTaskId.includes(".");
      const taskRef = isSubtask
        ? doc(db, "tasks", editingTaskId.split(".")[0]) // Reference the parent task
        : doc(db, "tasks", editingTaskId);

      const updatedTasks = tasks.map((task) => {
        if (task.id === editingTaskId.split(".")[0]) {
          // Update parent task
          if (isSubtask && task.subtasks) {
            const updatedSubtasks = task.subtasks.map((subtask) =>
              subtask.id === editingTaskId
                ? { ...subtask, ...newTask }
                : subtask
            );
            return { ...task, subtasks: updatedSubtasks };
          }
          return task.id === editingTaskId ? { ...task, ...newTask } : task;
        }
        return task;
      });

      setTask(updatedTasks);

      // Update Firestore
      const parentTask = updatedTasks.find(
        (task) => task.id === editingTaskId.split(".")[0]
      );
      if (parentTask) {
        await setDoc(taskRef, parentTask, { merge: true });
      }

      toast({
        title: "Task Updated",
        description: `Task "${newTask.name}" has been successfully updated.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setEditingTaskId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  console.log("Tasks:", tasks);

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
        // Handle Subtask Deletion
        const [parentId] = editingTaskId.split(".");
        const parentTaskRef = doc(tasksCollection, parentId);

        // Fetch parent task
        const parentTaskSnap = await getDoc(parentTaskRef);
        if (!parentTaskSnap.exists()) {
          throw new Error("Parent task not found.");
        }

        const parentTask = parentTaskSnap.data();
        const updatedSubtasks = parentTask.subtasks.filter(
          (subtask: Task) => subtask.id !== editingTaskId
        );

        await setDoc(parentTaskRef, {
          ...parentTask,
          subtasks: updatedSubtasks,
        });

        setTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === parentId ? { ...task, subtasks: updatedSubtasks } : task
          )
        );

        toast({
          title: "Subtask Deleted",
          description: `Subtask "${editingTaskId}" has been successfully deleted.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        // Handle Parent Task Deletion
        const taskRef = doc(tasksCollection, editingTaskId);

        // Delete from Firestore
        await deleteDoc(taskRef);

        // Update local state
        setTask((prevTasks) =>
          prevTasks.filter((task) => task.id !== editingTaskId)
        );

        toast({
          title: "Task Deleted",
          description: `Task "${editingTaskId}" has been successfully deleted.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      // Close modal and reset state
      setEditingTaskId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const renderTaskRows = (task: Task, level: number) => {
    return (
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
            onClick={
              task.type === "project"
                ? () => toggleSubtasks(task.id)
                : undefined
            }
            cursor={task.type === "project" ? "pointer" : "default"}
            display="flex"
            alignItems={"center"}
          >
            {task.type === "project" ? (
              <FontAwesomeIcon
                color="orange"
                icon={expandedTaskId === task.id ? faFolderOpen : faFolder}
                style={{ marginRight: "8px" }}
              />
            ) : (
              <FontAwesomeIcon
                color="blue"
                icon={faFileAlt}
                style={{ marginRight: "8px" }}
              />
            )}
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
          {task.type === "project" && (
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
          )}
        </Tr>

        {expandedTaskId === task.id &&
          task.subtasks &&
          task.subtasks.map((subtask) => renderTaskRows(subtask, level + 1))}
      </React.Fragment>
    );
  };

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
              minWidth={"150px"}
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
        <Tbody>{tasks.map((task) => renderTaskRows(task, 0))}</Tbody>
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



const tasks: Task[] = [
  {
    id: "1",
    name: "Project Initialization",
    plannedStart: "2024-11-01",
    plannedEnd: "2024-11-05",
    actualStart: "2024-11-01",
    actualEnd: "2024-11-04",
    duration: 5,
    actualDuration: 4,
    dependency: "",
    risk: "Low",
    progress: 100,
    status: "Completed",
    type: "task",
    role: "Project Manager",
    stage: "Initiation",
    subtasks: [
      {
        id: "1.1",
        name: "Requirement Gathering",
        plannedStart: "2024-11-01",
        plannedEnd: "2024-11-03",
        actualStart: "2024-11-01",
        actualEnd: "2024-11-02",
        duration: 3,
        actualDuration: 2,
        dependency: "",
        risk: "Medium",
        progress: 100,
        status: "Completed",
        type: "subtask",
        role: "Analyst",
        stage: "Requirements",
        subtasks: [
          {
            id: "1.1.1",
            name: "Stakeholder Interviews",
            plannedStart: "2024-11-01",
            plannedEnd: "2024-11-02",
            actualStart: "2024-11-01",
            actualEnd: "2024-11-02",
            duration: 2,
            actualDuration: 2,
            dependency: "",
            risk: "Low",
            progress: 100,
            status: "Completed",
            type: "subtask",
            subtasks: [],
          },
          {
            id: "1.1.2",
            name: "Document Requirements",
            plannedStart: "2024-11-02",
            plannedEnd: "2024-11-03",
            actualStart: "2024-11-02",
            actualEnd: "2024-11-02",
            duration: 1,
            actualDuration: 1,
            dependency: "1.1.1",
            risk: "Low",
            progress: 100,
            status: "Completed",
            type: "subtask",
            subtasks: [],
          },
        ],
      },
      {
        id: "1.2",
        name: "Feasibility Study",
        plannedStart: "2024-11-03",
        plannedEnd: "2024-11-05",
        actualStart: "2024-11-03",
        actualEnd: "2024-11-04",
        duration: 3,
        actualDuration: 2,
        dependency: "1.1",
        risk: "High",
        progress: 100,
        status: "Completed",
        type: "subtask",
        role: "Architect",
        stage: "Feasibility",
        subtasks: [
          {
            id: "1.2.1",
            name: "Technical Feasibility",
            plannedStart: "2024-11-03",
            plannedEnd: "2024-11-04",
            actualStart: "2024-11-03",
            actualEnd: "2024-11-03",
            duration: 1,
            actualDuration: 1,
            dependency: "",
            risk: "Medium",
            progress: 100,
            status: "Completed",
            type: "subtask",
            subtasks: [],
          },
          {
            id: "1.2.2",
            name: "Cost Analysis",
            plannedStart: "2024-11-04",
            plannedEnd: "2024-11-05",
            actualStart: "2024-11-04",
            actualEnd: "2024-11-04",
            duration: 1,
            actualDuration: 1,
            dependency: "1.2.1",
            risk: "Medium",
            progress: 100,
            status: "Completed",
            type: "subtask",
            subtasks: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Design Phase",
    plannedStart: "2024-11-06",
    plannedEnd: "2024-11-10",
    actualStart: "2024-11-06",
    actualEnd: "2024-11-09",
    duration: 5,
    actualDuration: 4,
    dependency: "1",
    risk: "Medium",
    progress: 80,
    status: "In Progress",
    type: "task",
    role: "Architect",
    stage: "Design",
    subtasks: [
      {
        id: "2.1",
        name: "UI/UX Design",
        plannedStart: "2024-11-06",
        plannedEnd: "2024-11-08",
        actualStart: "2024-11-06",
        actualEnd: "2024-11-07",
        duration: 3,
        actualDuration: 2,
        dependency: "",
        risk: "Low",
        progress: 100,
        status: "Completed",
        type: "subtask",
        subtasks: [],
      },
      {
        id: "2.2",
        name: "Database Schema Design",
        plannedStart: "2024-11-08",
        plannedEnd: "2024-11-10",
        actualStart: "2024-11-08",
        actualEnd: "2024-11-09",
        duration: 3,
        actualDuration: 2,
        dependency: "2.1",
        risk: "Medium",
        progress: 60,
        status: "In Progress",
        type: "subtask",
        subtasks: [
          {
            id: "2.2.1",
            name: "Entity Relationship Diagram (ERD)",
            plannedStart: "2024-11-08",
            plannedEnd: "2024-11-09",
            actualStart: "2024-11-08",
            actualEnd: "2024-11-08",
            duration: 1,
            actualDuration: 1,
            dependency: "",
            risk: "Low",
            progress: 100,
            status: "Completed",
            type: "subtask",
            subtasks: [],
          },
          {
            id: "2.2.2",
            name: "Normalization",
            plannedStart: "2024-11-09",
            plannedEnd: "2024-11-10",
            actualStart: "2024-11-09",
            actualEnd: "",
            duration: 1,
            dependency: "2.2.1",
            risk: "Medium",
            progress: 40,
            status: "In Progress",
            type: "subtask",
            subtasks: [],
          },
        ],
      },
    ],
  },
];
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
      // If it's a subtask
      const parentTask = tasks.find((t) => t.id === parentTaskId);
      const subtaskToEdit = parentTask?.subtasks?.find(
        (sub) => sub.id === task.id
      );
      if (subtaskToEdit) {
        setNewTask({ ...subtaskToEdit });
        setEditingTaskId(task.id);
      }
    } else {
      // If it's a parent task
      setNewTask({ ...task });
      setEditingTaskId(task.id);
    }
    setIsModalOpen(true);
  };

  // const toggleSubtasks = (taskId: string) => {
  //   setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  // };
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
  const handleAddTaskClick = (parentId?: string) => {
    if (parentId) {
      const selectedTask = tasks.find(
        (task) =>
          task.id === parentId ||
          task.subtasks?.find((sub) => sub.id === parentId)
      );

      setNewTask({
        id: `${parentId}.${(selectedTask?.subtasks?.length || 0) + 1}`,
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
      setIsModalOpen(true);
    } else {
      // Add a parent task
      const newParentId = `${tasks.length + 1}`;
      setNewTask({
        id: newParentId,
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
      setIsModalOpen(true);
    }
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
      const newDuration = (prev.actualDuration || 0) + change;
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
    console.log(editingTaskId)
    if (!newTask.name || !newTask.plannedStart || !newTask.plannedEnd) {
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

    try {
      const tasksCollection = collection(db, "tasks");

      if (newTask.id.includes(".")) {
        // Handle Subtask
        const [parentId] = newTask.id.split(".");
        const parentTaskRef = doc(tasksCollection, parentId);

        // Fetch the parent task
        const parentTaskSnap = await getDoc(parentTaskRef);
        if (!parentTaskSnap.exists()) {
          throw new Error("Parent task not found.");
        }

        const parentTask = parentTaskSnap.data();

        // Update the subtasks array
        const updatedSubtasks = [
          ...(parentTask.subtasks || []),
          { ...newTask },
        ];

        await setDoc(parentTaskRef, {
          ...parentTask,
          subtasks: updatedSubtasks,
        });

        // Update local state
        setTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === parentId ? { ...task, subtasks: updatedSubtasks } : task
          )
        );

        toast({
          title: "Subtask Saved",
          description: `Subtask "${newTask.name}" added to Task ${parentId}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        // Handle Parent Task
        const snapshot = await getDocs(tasksCollection);

        const existingIds = snapshot.docs.map(
          (doc) => parseInt(doc.id, 10) || 0
        );
        const nextId = (Math.max(0, ...existingIds) + 1).toString();

        const taskWithId = { ...newTask, id: nextId };

        const docRef = doc(tasksCollection, nextId);
        await setDoc(docRef, taskWithId);

        // Update local state
        setTask((prevTasks) => [...prevTasks, taskWithId]);

        toast({
          title: "Task Saved",
          description: `Your task "${newTask.name}" has been successfully saved.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving task:", error);
      toast({
        title: "Error",
        description: "Failed to save task. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleUpdateTask = async () => {
    if (!newTask.name || !newTask.plannedStart || !newTask.plannedEnd) {
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
      const isSubtask = editingTaskId.includes(".");
      const taskRef = isSubtask
        ? doc(db, "tasks", editingTaskId.split(".")[0]) // Reference the parent task
        : doc(db, "tasks", editingTaskId);

      const updatedTasks = tasks.map((task) => {
        if (task.id === editingTaskId.split(".")[0]) {
          // Update parent task
          if (isSubtask && task.subtasks) {
            const updatedSubtasks = task.subtasks.map((subtask) =>
              subtask.id === editingTaskId
                ? { ...subtask, ...newTask }
                : subtask
            );
            return { ...task, subtasks: updatedSubtasks };
          }
          return task.id === editingTaskId ? { ...task, ...newTask } : task;
        }
        return task;
      });

      setTask(updatedTasks);

      // Update Firestore
      const parentTask = updatedTasks.find(
        (task) => task.id === editingTaskId.split(".")[0]
      );
      if (parentTask) {
        await setDoc(taskRef, parentTask, { merge: true });
      }

      toast({
        title: "Task Updated",
        description: `Task "${newTask.name}" has been successfully updated.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      setEditingTaskId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  console.log("Tasks:", tasks);

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
        // Handle Subtask Deletion
        const [parentId] = editingTaskId.split(".");
        const parentTaskRef = doc(tasksCollection, parentId);

        // Fetch parent task
        const parentTaskSnap = await getDoc(parentTaskRef);
        if (!parentTaskSnap.exists()) {
          throw new Error("Parent task not found.");
        }

        const parentTask = parentTaskSnap.data();
        const updatedSubtasks = parentTask.subtasks.filter(
          (subtask: Task) => subtask.id !== editingTaskId
        );

        await setDoc(parentTaskRef, {
          ...parentTask,
          subtasks: updatedSubtasks,
        });

        setTask((prevTasks) =>
          prevTasks.map((task) =>
            task.id === parentId ? { ...task, subtasks: updatedSubtasks } : task
          )
        );

        toast({
          title: "Subtask Deleted",
          description: `Subtask "${editingTaskId}" has been successfully deleted.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        // Handle Parent Task Deletion
        const taskRef = doc(tasksCollection, editingTaskId);

        // Delete from Firestore
        await deleteDoc(taskRef);

        // Update local state
        setTask((prevTasks) =>
          prevTasks.filter((task) => task.id !== editingTaskId)
        );

        toast({
          title: "Task Deleted",
          description: `Task "${editingTaskId}" has been successfully deleted.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      // Close modal and reset state
      setEditingTaskId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
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
          paddingLeft={`${level * 20}px`} // Indent subtasks
        >
          <FontAwesomeIcon
            color={level === 0 ? "orange" : "blue"}
            icon={expandedTaskIds.has(task.id) ? faFolderOpen : faFolder}
            style={{ marginRight: "8px" }}
          />
          {task.name}
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
              minWidth={"150px"}
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




import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import ReactFlow, {
  addEdge,
  ReactFlowProvider,
  Background,
  Controls,
  Edge,
  Node,
  MarkerType,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";

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
  connectionType: "FS" | "SS" | "FF" | "SF";
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
      const newDuration = (prev.actualDuration || 0) + change;
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
    if (!newTask.name || !newTask.plannedStart || !newTask.plannedEnd) {
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
    if (!newTask.name || !newTask.plannedStart || !newTask.plannedEnd) {
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

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  

  useEffect(() => {
    // Extract unique IDs from connections
    const uniqueIds = Array.from(
      new Set(connections.flatMap((connection) => [connection.fromId, connection.toId]))
    );
  
    // Generate nodes for each unique ID
    const generatedNodes = uniqueIds.map((id, index) => ({
      id,
      position: { x: 100 + index * 200, y: 100 }, // Adjust positions as needed
      data: { label: `Node ${id}` },
    }));
  
    setNodes(generatedNodes);
  }, [connections]);
  

  useEffect(() => {
    const newEdges = connections.map((connection) => ({
      id: `edge-${connection.fromId}-${connection.toId}`,
      source: connection.fromId,
      target: connection.toId,
      type: "smoothstep",
      animated: true,
      markerEnd: { type: MarkerType.Arrow },
    }));
    setEdges(newEdges);
  }, [connections]);
  
  
  

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

  console.log("Connections:", connections);

  const handleCircleDragStart = (
    e: React.MouseEvent<SVGCircleElement>,
    nodeId: string,
    point: "start" | "end"
  ) => {
    e.stopPropagation();
    const circle = e.currentTarget.getBoundingClientRect();
    const svg = timelineRef.current?.getBoundingClientRect();
  
    if (svg) {
      const startX = circle.x - svg.x + circle.width / 2;
      const startY = circle.y - svg.y + circle.height / 2;
  
      setDraggingConnection({
        fromId: nodeId,
        startX,
        startY,
        point,
      });
    }
  };
  
  const handleCircleDragEnd = (
    e: React.MouseEvent<SVGCircleElement>,
    targetId: string
  ) => {
    e.stopPropagation();
  
    if (draggingConnection) {
      const circle = e.currentTarget.getBoundingClientRect();
      const svg = timelineRef.current?.getBoundingClientRect();
  
      if (svg) {
        const endX = circle.x - svg.x + circle.width / 2;
        const endY = circle.y - svg.y + circle.height / 2;
  
        setConnections((prev) => [
          ...prev,
          {
            fromId: draggingConnection.fromId,
            toId: targetId,
            startX: draggingConnection.startX,
            startY: draggingConnection.startY,
            endX,
            endY,
          },
        ]);
      }
    }
  
    setDraggingConnection(null);
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
    if (fromX < toX && fromY === toY) return "straight"; // Straight horizontal
    if (fromX === toX && fromY < toY) return "vertical"; // Straight vertical
    if (fromX < toX && fromY < toY) return "L-shape"; // L-shaped
    if (fromX > toX && fromY < toY) return "reverse-L"; // Reverse L-shaped
    if (fromX > toX && fromY > toY) return "zigzag"; // Zigzag for end-to-start
    return "complex"; // Any other complex case
  };

  const calculateArrowPath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    type: string,
    offset = 10, // Offset to avoid bars
    circleRadius = 5
  ) => {
    switch (type) {
      case "straight":
        console.log("Straight:", startX, startY, endX, endY);
        return `M ${startX},${startY - offset} L ${endX},${endY - offset}`;
      case "vertical":
        console.log("Vertical:", startX, startY, endX, endY);
        return `M ${startX},${startY - offset} L ${startX},${endY + offset}`;
      case "L-shape": {
        // Adjust startY and endY to include the circle radius and a 1 cm adjustment
        const adjustedStartY = startY + circleRadius - 5; // Move 1 cm above or below
        const adjustedEndY = endY + circleRadius - 5; // Move 1 cm above or below
        console.log("L-shape:", startX, adjustedStartY, endX, adjustedEndY);
        return `M ${startX},${adjustedStartY} L ${startX},${adjustedEndY} L ${endX},${adjustedEndY}`;
      }
      case "reverse-L":
        console.log("Reverse L:", startX, startY, endX, endY);
        return `M ${startX},${startY - offset} L ${endX},${
          startY - offset
        } L ${endX},${endY - offset}`;
      case "zigzag": {
        console.log("Zigzag:", startX, startY, endX, endY);
        const midX1 = startX - 20; // First horizontal line back
        const midY = (startY + endY) / 2; // Midpoint vertically
        const midX2 = endX + 20; // Second horizontal line forward
        return `M ${startX},${startY - offset} L ${midX1},${
          startY - offset
        } L ${midX1},${midY} L ${midX2},${midY} L ${midX2},${
          endY + offset
        } L ${endX},${endY + offset}`;
      }
      case "complex": {
        console.log("Complex:", startX, startY, endX, endY);
        const complexMidX = (startX + endX) / 2;
        const complexMidY = (startY + endY) / 2;
        return `M ${startX},${startY - offset} L ${complexMidX},${
          startY - offset
        } L ${complexMidX},${complexMidY} L ${endX},${endY + offset}`;
      }
      default:
        console.log("Default:", startX, startY, endX, endY);
        return `M ${startX},${startY - offset} L ${endX},${endY - offset}`;
    }
  };

  const renderConnections = () =>
    connections.map((connection, index) => {
      const { startX, startY, endX, endY } = connection;

      // Determine the connection type dynamically
      const connectionType = getConnectionType(startX, startY, endX, endY);

      // Add a small offset to avoid bars and align with circle centers
      const path = calculateArrowPath(
        startX,
        startY,
        endX,
        endY,
        connectionType,
        10
      ); // Offset is 10px

      return (
        <path
          key={index}
          d={path}
          fill="none"
          stroke="orange"
          strokeWidth={1}
          markerEnd="url(#arrowhead)" // Arrowhead marker
        />
      );
    });

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

  const updateConnections = (taskId: string, updatedTasks: Task[]) => {
    setConnections((prevConnections) =>
      prevConnections.map((connection) => {
        if (connection.fromId === taskId || connection.toId === taskId) {
          const fromTask = updatedTasks.find((t) => t.id === connection.fromId);
          const toTask = updatedTasks.find((t) => t.id === connection.toId);

          const fromPosition = fromTask
            ? calculateCirclePosition(fromTask, "start")
            : undefined;
          const toPosition = toTask
            ? calculateCirclePosition(toTask, "end")
            : undefined;

          if (fromPosition && toPosition) {
            return {
              ...connection,
              startX: fromPosition.x,
              startY: fromPosition.y,
              endX: toPosition.x,
              endY: toPosition.y,
            };
          }
        }
        return connection; // Return the original connection if no updates are needed
      })
    );
  };

  const handleDragStop = (task: Task, dragX: number) => {
    const timelineDuration =
      new Date(maxDate).getTime() - new Date(minDate).getTime();
    const daysMoved = Math.round(
      (dragX / timelineWidth) * (timelineDuration / (1000 * 60 * 60 * 24))
    );

    setTask((prevTasks) => {
      const updatedTasks = prevTasks.map((t) =>
        t.id === task.id
          ? {
              ...t,
              actualStart: new Date(
                new Date(task.actualStart).getTime() + daysMoved * 86400000
              ).toISOString(),
              actualEnd: new Date(
                new Date(task.actualEnd).getTime() + daysMoved * 86400000
              ).toISOString(),
            }
          : t
      );

      updateConnections(task.id, updatedTasks); // Update connections after dragging
      return updatedTasks;
    });
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
    console.log("Nodes:", nodes);
    console.log("Connections:", connections);
    console.log("Edges:", edges);
  }, [nodes, connections, edges]);
  

  return (
    <Box
      ref={timelineRef}
      width={width}
      pt={1.5}
      overflowY="auto"
      height="100vh"
      position="relative"
    >
      <ReactFlow
        nodes={nodes}
        edges={connections.map((connection) => ({
          id: `edge-${connection.fromId}-${connection.toId}`,
          source: connection.fromId,
          target: connection.toId,
          type: "smoothstep",
          animated: true,
          markerEnd: "arrow",
        }))}
        fitView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Background />
      </ReactFlow>
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
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
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="orange" />
          </marker>
        </defs>

        {renderTemporaryLine()}
      </svg>

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

      <Flex align="center" mb={2}>
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
          onClick={toggleEditMode}
          colorScheme={isEditMode ? "red" : "blue"}
        >
          {isEditMode ? "Disable Edit" : "Enable Edit"}
        </Button>
      </Flex>
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
                          onStop={(e, data) => handleDragStop(subtask, data.x)}
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
                                  cx="10"
                                  cy="10"
                                  r="5"
                                  stroke="gray"
                                  fill="white"
                                  onMouseDown={(e) =>
                                    handleCircleDragStart(e, subtask.id, "start")
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
                        left={`${actualPosition + 5}px`}
                        transform="translateY(-50%)"
                        width={`${actualWidth}px`}
                        bg="green.400"
                        height="14px"
                        borderRadius="sm"
                        onClick={(e) => handleBarClick(e, task, "actual")}
                      >
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
