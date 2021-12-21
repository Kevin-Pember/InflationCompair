from tkinter import *

window = Tk()
window.title("Uping")
window.geometry("500x700")

label = Label(window, 
text="Upling",
font=('Arial', 40),
fg='black',
width= 30)
label.pack()

icon = PhotoImage(file='Icon.png')
window.iconphoto(True,icon)
window.config(background="white")

window.mainloop()