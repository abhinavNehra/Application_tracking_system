import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StatsCard = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    gap: theme.spacing(2),
}));

function Stats() {
    // Sample data - replace with your actual data
    const stats = {
        totalWeightedPipeline: '€822,001',
        totalPipeline: '€2,796,756',
        dealsWon: '€417,024',
        dealsLost: '€60,000',
    };

    return (
        <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid>
                <StatsCard sx={{ bgcolor: 'primary.light' }}>
                    <Typography variant="subtitle2">
                        Total Weighted Pipeline:
                    </Typography>
                    <Typography variant="h6">
                        {stats.totalWeightedPipeline}
                    </Typography>
                </StatsCard>
            </Grid>
            <Grid>
                <StatsCard sx={{ bgcolor: 'info.light' }}>
                    <Typography variant="subtitle2">Total Pipeline:</Typography>
                    <Typography variant="h6">{stats.totalPipeline}</Typography>
                </StatsCard>
            </Grid>
            <Grid>
                <StatsCard sx={{ bgcolor: 'success.light' }}>
                    <Typography variant="subtitle2">Deals Won:</Typography>
                    <Typography variant="h6">{stats.dealsWon}</Typography>
                </StatsCard>
            </Grid>
            <Grid>
                <StatsCard sx={{ bgcolor: 'error.light' }}>
                    <Typography variant="subtitle2">Deals Lost:</Typography>
                    <Typography variant="h6">{stats.dealsLost}</Typography>
                </StatsCard>
            </Grid>
        </Grid>
    );
}

export default Stats;
