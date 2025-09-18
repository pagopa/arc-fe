import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { BuildInput, FieldBeanPros } from "../config"


const TAB = (props: FieldBeanPros) => {
  const { input, formState, zodIssues, onChange } = props;
  const { name } = input;
  const value = formState[name];
  return (
    <TabContext value={value}>
      <TabList onChange={(_, value) => onChange(name, value)}>
        {
          input.subfields?.map((field) => (
            <Tab label={field.htmlLabel} value={field.name}/>
          ))
        }
      </TabList>
      {
        input.subfields?.map((field) => (
          <TabPanel value={field.name}>
            <Box display={'flex'} flexDirection="row" gap={2} flexWrap="wrap" justifyContent={"center"}>
              {field.subfields?.map((subfield) => BuildInput(subfield, formState, zodIssues, onChange))}
            </Box>
          </TabPanel>
        ))
      }
    </TabContext>
  )
}

export default TAB;
