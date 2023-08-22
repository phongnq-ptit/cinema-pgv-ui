import React, {useEffect, useState} from 'react';
import {IFilter} from '../../../screens/client/home/Home';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {User} from '../../../models/User';
import {Category} from '../../../models/Category';
import useUserApi from '../../../hooks/apis/useUserApi';
import {UserRole} from '../../../models/enums/UserRole';
import useCategoryApi from '../../../hooks/apis/useCategoryApi';

interface Props {
  filter: IFilter;
  setFilter: Function;
  reload: boolean;
  setReload: Function;
}

const Filter = ({props}: {props: Props}) => {
  const {filter, setFilter, reload, setReload} = props;
  const {getUserByRole} = useUserApi();
  const {getListCategories} = useCategoryApi();
  const [branches, setBranches] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expanded, setExpanded] = React.useState<string[]>([
    'panel1',
    'panel2',
  ]);

  useEffect(() => {
    getUserByRole({role: UserRole.BRANCH})
      .then((response) => {
        setBranches(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    getListCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line
  }, []);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      if (newExpanded) {
        setExpanded([...expanded, panel]);
      } else {
        setExpanded([...expanded.filter((item) => item !== panel)]);
      }
    };

  const handleSelectBranches =
    (branch: User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setFilter({
          ...filter,
          branchUuids: [...filter.branchUuids, branch.uuid],
        });
      } else {
        setFilter({
          ...filter,
          branchUuids: [
            ...filter.branchUuids.filter((item) => item !== branch.uuid),
          ],
        });
      }
    };

  const handleSelectCategories =
    (category: Category) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setFilter({
          ...filter,
          categoryUuids: [...filter.categoryUuids, category.uuid],
        });
      } else {
        setFilter({
          ...filter,
          categoryUuids: [
            ...filter.categoryUuids.filter((item) => item !== category.uuid),
          ],
        });
      }
    };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <TextField
          label="Tìm theo tên phim"
          value={filter.searchName}
          onChange={(event) =>
            setFilter({...filter, searchName: event.target.value})
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => setReload(!reload)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Accordion
          expanded={expanded.includes('panel1')}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Chi nhánh</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {branches.map((branch) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.branchUuids.includes(branch.uuid)}
                      onChange={handleSelectBranches(branch)}
                    />
                  }
                  label={branch.userName}
                  key={branch.uuid}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion
          expanded={expanded.includes('panel2')}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Thể loại</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filter.categoryUuids.includes(category.uuid)}
                      onChange={handleSelectCategories(category)}
                    />
                  }
                  label={category.name}
                  key={category.uuid}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() => setReload(!reload)}
          fullWidth
        >
          Áp dụng
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default Filter;
