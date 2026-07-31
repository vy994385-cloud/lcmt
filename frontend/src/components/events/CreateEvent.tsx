import { useState } from "react"
import { createEvent } from "../../services/eventService"

import "./EventCard.css"

import toast from "react-hot-toast"

export default function CreateEvent() {

  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({

    title: "",

    description: "",

    location: "",

    image: "",

    startTime: "",

    endTime: "",

    visibility: "public",

    maxAttendees: 0,

    community: "",

  })

  function update(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    })

  }

  async function submit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    try {

      setLoading(true)

      await createEvent(form)

      toast.success(
  "Event created successfully 🎉"
)

      setForm({

        title: "",

        description: "",

        location: "",

        image: "",

        startTime: "",

        endTime: "",

        visibility: "public",

        maxAttendees: 0,

        community: "",

      })

    } catch {

      toast.error(
  "Unable to create event."
)

    } finally {

      setLoading(false)

    }

  }

  return (

    <form
      className="event-form"
      onSubmit={submit}
    >

      <input
        name="title"
        placeholder="Event title"
        value={form.title}
        onChange={update}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={update}
      />

      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={update}
      />

      <input
        name="image"
        placeholder="Cover image URL"
        value={form.image}
        onChange={update}
      />

      <label>

        Start

        <input
          type="datetime-local"
          name="startTime"
          value={form.startTime}
          onChange={update}
          required
        />

      </label>

      <label>

        End

        <input
          type="datetime-local"
          name="endTime"
          value={form.endTime}
          onChange={update}
          required
        />

      </label>

      <input
        type="number"
        name="maxAttendees"
        placeholder="Maximum attendees"
        value={form.maxAttendees}
        onChange={update}
      />

      <input
        name="community"
        placeholder="Community ID (optional)"
        value={form.community}
        onChange={update}
      />

      <select
        name="visibility"
        value={form.visibility}
        onChange={update}
      >

        <option value="public">
          Public
        </option>

        <option value="community">
          Community Only
        </option>

      </select>

      <button
        disabled={loading}
      >

        {loading
          ? "Creating..."
          : "Create Event"}

      </button>

    </form>

  )

}