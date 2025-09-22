import { Box, Card, CardContent } from "@mui/material";
import { BuildFormInputs, FieldBeanPros } from "../config";

const MULTFIELD = (props: FieldBeanPros) => {
  const { input } = props;
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display={'flex'} flexDirection="column" mb={2} gap={2}>
          <h3>{input.htmlLabel}</h3>
          {
            BuildFormInputs(input.subfields || [])
          }
        </Box>
      </CardContent>
    </Card>
  );
}

export default MULTFIELD
