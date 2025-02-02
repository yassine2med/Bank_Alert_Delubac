import React , {useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModifierUtilisateurModal from '../modals/ModifierUtilisateurModal';
import Swal from 'sweetalert2';
import { themeColors } from '../../data/variables';
import  { useContextState } from '../../contexts/ContextProvider'

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(id , name, gmail) {
  return { id, name, gmail };
}

const rows = [
    createData(1 , 'User1', 'user1@gmail.com'),
    createData(2 , 'User2', 'user2@gmail.com'),
    createData(3 , 'User3', 'user3@gmail.com'),
    createData(4 , 'User4', 'user4@gmail.com'),
  
].sort((a, b) => (a.name < b.name ? -1 : 1));


export default function CustomPaginationActionsTable() {

  const {isModalOpen, setModalOpen} = useContextState()
    
  const [openModifier, setOpenModifier] = React.useState(false);
  const handleCloseModifier = () => { setOpenModifier(false); hideBlur()}
  const handleOpenModifier = () => { setOpenModifier(true) }


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const hideBlur = () => { setModalOpen(false) }

  const InfoAlert = (text) => {
    Swal.fire({
      title: '',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: themeColors.success,
      cancelButtonColor: themeColors.danger,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui , Confirmer !',
      focusConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Le champs est supprimé avec succès', 
          showConfirmButton: false,
          timer: 2000
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title : 'Annulation de la suppression',
          showConfirmButton: false,
          timer: 2000,
        })
        }
        hideBlur()
      })

  }

  const ResetPassword = (text) => {
    Swal.fire({
      title: '',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: themeColors.success,
      cancelButtonColor: themeColors.danger,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui , Réinitialisé !',
      focusConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Le mot de passe réinitialisé avec succès',
          showConfirmButton: false,
          timer: 2000
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title : 'Annulation de la réinitialisation',
          showConfirmButton: false,
          timer: 2000,
        })
        setModalOpen(false)
        console.log(isModalOpen)
        }
        hideBlur()
      })
      
  }

  return (
  <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell  align='left'>
                {row.id}
              </TableCell>
              <TableCell  align="left">
                {row.name}
              </TableCell>
              <TableCell   align="left">
                {row.gmail}
              </TableCell>
              <TableCell align="right">
                <div className='flex justify-around '>
                  <RestartAltOutlinedIcon onClick={() => {ResetPassword("Est-ce-que vous êtes sûr de vouloir reinitialisé le mot de passe");setModalOpen(true);console.log(isModalOpen)}} />
                  <EditOutlinedIcon onClick={() => {handleOpenModifier();setModalOpen(true)}}/>
                  <DeleteOutlinedIcon onClick={() => {InfoAlert("Est-ce-que vous êtes sûr de vouloir supprimer ce champs ?");setModalOpen(true)}}/>
                </div>


              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>

    <ModifierUtilisateurModal isOpen={openModifier} toggle={handleCloseModifier}/>
  </>
  );
}