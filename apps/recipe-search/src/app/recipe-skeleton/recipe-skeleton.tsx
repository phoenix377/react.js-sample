import { Card, CardContent, CardHeader, Skeleton } from '@mui/material';

const TEXT_SKELETONS = ["80%", "60%", "40%", "90%", "30%"];

export const RecipeSkeleton: React.FC = (props) => {

  return (
    <Card sx={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}>
      <CardHeader
        avatar={
          <Skeleton variant="circular" width={40} height={40} />
        }
        title={(<>
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={10}
            width="20%"
            style={{ marginBottom: 6 }}
          />
        </>)}
        subheader={(<Skeleton
          animation="wave"
          height={10}
          width="40%"
          style={{ marginBottom: 16 }}
        />)}
      />
      <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
      <CardContent sx={{ minHeight: 150, maxHeight: 150, overflow: 'auto' }}>
        <>
          {TEXT_SKELETONS.map((width, index) => (
            <Skeleton
              key={index}
              animation="wave"
              height={10}
              width={width}
              style={{ marginBottom: 6 }}
            />
          ))}
        </>
      </CardContent>
    </Card>
  )
}
