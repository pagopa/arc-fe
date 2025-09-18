import { Box, Card, CardContent } from "@mui/material";
import { BuildInput, FieldBeanPros } from "../config";

const MULTFIELD = (props: FieldBeanPros) => {
  const { input, formState, zodIssues, onChange } = props
  return (
    <Card variant="outlined">
      <CardContent>
        <Box display={'flex'} flexDirection="column" mb={2} gap={2}>
          <h3>{input.htmlLabel}</h3>
          {
            input.subfields?.map((subfield) =>
              BuildInput(subfield, formState, zodIssues, onChange)
            )
          }
        </Box>
      </CardContent>
    </Card>
  );
}

export default MULTFIELD
