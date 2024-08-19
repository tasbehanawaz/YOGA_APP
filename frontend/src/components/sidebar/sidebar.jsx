import { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckboxVerticalListGroup } from '../checkbox/checkbox';
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
  Button,
} from '@material-tailwind/react';

import {
  ChevronDownIcon,
  StarIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

export function SidebarWithBurgerMenu({
  isDrawerOpen,
  closeDrawer,
  checkedFocusAreas,
  setCheckedFocusAreas,
  checkedDifficulty,
  setCheckedDifficulty,
  handleApplyFilters,
  handleResetFilters,
}) {
  const [open, setOpen] = useState(0);

  const focusAreas = ['Balance', 'Flexibility', 'Core'];
  const difficulty = ['Beginner', 'Intermediate', 'Advanced'];

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleReset = () => {
    setCheckedFocusAreas([]);
    setCheckedDifficulty([]);
    handleResetFilters();
  };

  return (
    <>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Filter your results
            </Typography>
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <TrophyIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Focus Area
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <CheckboxVerticalListGroup
                  labels={focusAreas}
                  checkedItems={checkedFocusAreas}
                  onChange={setCheckedFocusAreas}
                />
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? 'rotate-180' : ''
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <StarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Difficulty
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <CheckboxVerticalListGroup
                  labels={difficulty}
                  checkedItems={checkedDifficulty}
                  onChange={setCheckedDifficulty}
                />
              </AccordionBody>
            </Accordion>
            <div className="flex flex-col gap-3">
              <Button className="bg-green-900" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="bg-red-900" onClick={handleReset}>
                Reset Filetrs
              </Button>
            </div>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
SidebarWithBurgerMenu.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  setCheckedFocusAreas: PropTypes.func.isRequired,
  setCheckedDifficulty: PropTypes.func.isRequired,
  handleApplyFilters: PropTypes.func.isRequired,
  handleResetFilters: PropTypes.func.isRequired,
  checkedFocusAreas: PropTypes.func.isRequired,
  checkedDifficulty: PropTypes.func.isRequired,
};
