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

