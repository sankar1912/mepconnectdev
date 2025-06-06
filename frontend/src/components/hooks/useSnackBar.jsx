import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useNotifications } from '@toolpad/core'
function useSnackBar({message, status}) {
    const notification = useNotifications()
    notification.show(message, {
        variant: "primary",
        autoHideDuration: 2000,
        action: (key) => (
            <IconButton
                onClick={() => notification.close(key)}
                color="inherit"
                size="small"
            >
                <Close fontSize="small" />
            </IconButton>
        ),
    })
}

export default useSnackBar