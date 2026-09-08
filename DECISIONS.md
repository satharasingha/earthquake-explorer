# Three Decisions

## 1. Using the USGS API

### Decision

I decided to use the USGS Earthquake API as the main data source for the project.

### Alternatives considered

I considered using a downloaded CSV file or a local JSON dataset instead of an API.

### Why I chose this

I wanted the application to work with real earthquake data and allow users to explore current records rather than only using a fixed dataset.

### Cost

The application depends on the USGS API and an internet connection. If the API is slow or unavailable, the application cannot load new data. Because of this, I had to add loading and error states.

---

## 2. Keeping the dashboard simple

### Decision

I decided to focus on a few useful pieces of information instead of adding many different charts.

### Alternatives considered

I considered adding more charts and more detailed visualizations for different parts of the dataset.

### Why I chose this

I wanted the interface to help users quickly understand the earthquake data. The dashboard focuses on the number of events, largest magnitude, average magnitude, location, magnitude distribution, and largest recorded events.

### Cost

The dashboard does not show everything available in the USGS dataset. Someone who wants more detailed analysis would need to use the original dataset or another analysis tool.

---

## 3. Using a simple map visualization

### Decision

I decided to create a lightweight map-style visualization for showing earthquake locations instead of using a third-party mapping library.

### Alternatives considered

I considered using a mapping library such as Leaflet or Mapbox.

### Why I chose this

I wanted to keep the project simple and avoid adding another external dependency. The simple visualization was enough to show where the recorded earthquakes were located.

### Cost

This decision has proved a little awkward because the visualization is not as detailed as a real map. It does not provide features such as zooming, country boundaries, or proper map navigation. If I continued developing the project, I would consider replacing it with a proper mapping library.
