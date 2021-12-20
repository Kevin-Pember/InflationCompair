from tkinter import *

window = Tk()
window.title("First GUI")
window.geometry("200x100")

icon = PhotoImage(file='Icon.png')
window.iconphoto(True,icon)
window.config(background="white")

window.mainloop()